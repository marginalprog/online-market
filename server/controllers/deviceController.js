const uuid = require('uuid');
const path = require('path');
const { buildFilters } = require('../utils/filters');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');
const { Sequelize, Op } = require('sequelize');

class DeviceController {
  async create(req, res, next) {
    await Promise.all([
      body('name')
        .notEmpty()
        .withMessage('Field "name" is required')
        .isString()
        .withMessage('Field "name" must be a string')
        .isLength({ max: 255 })
        .withMessage('Field "name" cannot exceed 255 characters'),
      body('price')
        .notEmpty()
        .withMessage('Field "price" is required')
        .isNumeric()
        .withMessage('Field "price" must be a numeric'),
      body('brandId')
        .notEmpty()
        .withMessage('Field "brandId" is required')
        .isInt()
        .withMessage('Field "brandId" must be a integer'),
      body('typeId')
        .notEmpty()
        .withMessage('Field "typeId" is required')
        .isInt()
        .withMessage('Field "typeId" must be a integer'),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest(
          errors
            .array()
            .map(e => e.msg)
            .join(', ')
        )
      );
    }

    try {
      let { name, price, brandId, typeId, info } = req.body;

      if (!req.files || !req.files.img) {
        return next(ApiError.badRequest('Image is required'));
      }
      const { img } = req.files;

      let fileName = uuid.v4() + '.jpg';

      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        try {
          info = JSON.parse(info);

          console.log('Parsed info:', info);

          if (!Array.isArray(info)) {
            throw new Error('Info must be an array');
          }

          info.forEach(item => {
            if (!item.title || !item.description) {
              throw new Error(
                'Each info item must have "title" and "description"'
              );
            }

            DeviceInfo.create({
              title: item.title,
              description: item.description,
              deviceId: device.id,
            });
          });
        } catch (err) {
          return next(ApiError.badRequest('Invalid info format'));
        }
      }

      return res.status(201).json(device);
    } catch (err) {
      if (err instanceof Sequelize.UniqueConstraintError) {
        return next(
          ApiError.badRequest(`Device with this name already exists`)
        );
      }

      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    try {
      const allowedFields = ['brandId', 'typeId', 'price', 'rating', 'name'];

      const filters = await buildFilters(req.query, allowedFields);

      const devices = await Device.findAndCountAll({
        where: filters,
        limit,
        offset,
      });

      return res.json(devices);
    } catch (error) {
      return next(ApiError.internal('Failed to fetch devices', error.message));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });

      if (!device) {
        return next(ApiError.notFound('Device not found'));
      }

      return res.json(device);
    } catch (error) {
      return next(ApiError.internal('Failed to fetch device', error.message));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const deletedRows = await Device.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return next(ApiError.notFound('Device not found'));
      }

      return res.status(204).send(); // No Content
    } catch (error) {
      return next(ApiError.internal('Failed to delete type', error.message));
    }
  }

  async patch(req, res, next) {
    await Promise.all([
      body('name')
        .optional()
        .isString()
        .withMessage('Field "name" must be a string')
        .isLength({ max: 255 })
        .withMessage('Field "name" cannot exceed 255 characters')
        .run(req),

      body('price')
        .optional()
        .isNumeric()
        .withMessage('Field "price" must be a numeric')
        .run(req),

      body('brandId')
        .optional()
        .isInt()
        .withMessage('Field "brandId" must be a integer')
        .run(req),

      body('typeId')
        .optional()
        .isInt()
        .withMessage('Field "typeId" must be a integer')
        .run(req),

      body('rating')
        .optional()
        .isInt()
        .withMessage('Field "rating" must be a integer number')
        .run(req),

      body('img')
        .optional()
        .isString()
        .run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest(
          errors
            .array()
            .map(e => e.msg)
            .join(', ')
        )
      );
    }

    const { id } = req.params;
    const { info, ...updateData } = req.body;

    const device = await Device.findByPk(id);

    if (!device) {
      return next(ApiError.notFound('Type not found'));
    }

    if (Object.keys(updateData).length === 0) {
      return next(ApiError.badRequest('No data provided for update'));
    }

    try {
      const updatedDevice = await device.update(updateData);

      if (info) {
        const infoData = JSON.parse(info);

        for (const item of infoData) {
          if (item.id) {
            await DeviceInfo.update(
              { title: item.title, description: item.description },
              { where: { id: item.id, deviceId: id } }
            );
          } else {
            await DeviceInfo.create({
              title: item.title,
              description: item.description,
              deviceId: id,
            });
          }
        }

        const existingInfoIds = infoData
          .filter(item => item.id)
          .map(item => item.id);
        await DeviceInfo.destroy({
          where: {
            deviceId: id,
            ...(existingInfoIds.length > 0 && {
              id: { [Op.notIn]: existingInfoIds },
            }),
          },
        });
      }

      return res.json(updatedDevice);
    } catch (error) {
      return next(ApiError.internal('Failed to update type', error.message));
    }
  }
}

module.exports = new DeviceController();
