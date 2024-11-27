const { Rating, Device } = require('../models/models');
const { body, validationResult } = require('express-validator');
const ApiError = require('../error/apiError');
const { Sequelize } = require('sequelize');

class RatingController {
  async create(req, res, next) {
    await Promise.all([
      await body('deviceId')
        .notEmpty()
        .withMessage('Field "deviceId" is required')
        .isInt()
        .withMessage('Field "deviceId" must be an integer'),
      await body('rate')
        .notEmpty()
        .withMessage('Field "rate" is required')
        .isInt()
        .withMessage('Field "rate" must be an integer')
        .run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()[0].msg));
    }

    const userId = req.user.id;
    const { deviceId, rate } = req.body;

    try {
      const device = await Device.findByPk(deviceId);

      if (!device) {
        return next(ApiError.notFound('Device not found'));
      }

      const rating = await Rating.create({ userId, deviceId, rate });

      await device.increment('reviews', { by: 1 });
      const totalRating = device.rating * (device.reviews - 1) + rate;
      const averageRating = (totalRating / device.reviews).toFixed(2);

      await device.update({ rating: averageRating });

      return res.json(rating);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        if (err instanceof Sequelize.UniqueConstraintError) {
          return next(
            ApiError.badRequest('User has already reviewed this device')
          );
        }

        return next(
          ApiError.badRequest('Wrong rating for device (1-5 available)')
        );
      }

      return next(ApiError.internal(err.message));
    }
  }

  async getUserReviews(req, res, next) {
    let { limit, page } = req.query;
    const { userId } = req.params;

    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    try {
      const reviews = await Rating.findAndCountAll({
        where: { userId },
        limit,
        offset,
      });

      return res.json(reviews);
    } catch (error) {
      return next(
        ApiError.internal('Failed to fetch user reviews', error.message)
      );
    }
  }

  async getDeviceReviews(req, res, next) {
    let { limit, page } = req.query;
    const { deviceId } = req.params;

    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    try {
      const reviews = await Rating.findAndCountAll({
        where: { deviceId },
        limit,
        offset,
      });

      return res.json(reviews);
    } catch (error) {
      return next(
        ApiError.internal('Failed to fetch device reviews', error.message)
      );
    }
  }

  async delete(req, res, next) {
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
      const { ratingId } = req.params;
      let rating;

      if (userRole === 'ADMIN') {
        rating = await Rating.findByPk(ratingId);
      } else {
        rating = await Rating.findOne({
          where: {
            id: ratingId,
            userId,
          },
        });
      }

      if (!rating) {
        return next(ApiError.notFound('Review not found or not owned by user'));
      }

      const device = await Device.findByPk(rating.deviceId);

      if (device) {
        await device.decrement('reviews', { by: 1 });
      }

      if (device.reviews > 0) {
        const totalRating = device.rating * (device.reviews + 1) - rating.rate;
        const averageRating = (totalRating / device.reviews).toFixed(2);

        await device.update({ rating: averageRating });
      } else {
        await device.update({ rating: 0 });
      }

      await rating.destroy();

      return res.status(204).send();
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        return next(
          ApiError.badRequest('Wrong rating for device (1-5 availabe)')
        );
      }

      return next(ApiError.internal(err.message));
    }
  }

  async patch(req, res, next) {
    await Promise.all([
      await body('deviceId')
        .notEmpty()
        .withMessage('Field "deviceId" is required')
        .isInt()
        .withMessage('Field "deviceId" must be an integer'),
      await body('rate')
        .notEmpty()
        .withMessage('Field "rate" is required')
        .isInt()
        .withMessage('Field "rate" must be an integer')
        .run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()[0].msg));
    }

    const userId = req.user.id;
    const { ratingId } = req.params;
    const { deviceId, rate } = req.body;

    try {
      let rating = await Rating.findByPk(ratingId);

      if (!rating) {
        return next(ApiError.notFound('Review not found'));
      }

      if (rating.userId !== userId) {
        return next(ApiError.notFound('Review not owned by user'));
      }

      const device = await Device.findByPk(deviceId);

      if (!device) {
        return next(ApiError.notFound('Device not found'));
      }

      await Rating.update({ rate }, { where: { id: rating.id, userId } });

      // count по таблице - плохая идея. лучше улучшить логику по reviews_count у девайса
      const ratings = await Rating.findAll({ where: { deviceId } });
      const totalReviews = ratings.length;
      const totalRating = ratings.reduce((sum, r) => sum + r.rate, 0);
      const averageRating = (totalRating / totalReviews).toFixed(2);

      await device.update({ rating: averageRating, reviews: totalReviews });

      return res.json({ message: 'Rating updated successfully' });
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        return next(
          ApiError.badRequest('Wrong rating for device (1-5 available)')
        );
      }

      return next(ApiError.internal(err.message));
    }
  }
}

module.exports = new RatingController();
