const { Brand } = require('../models/models');
const { body, validationResult } = require('express-validator');
const ApiError = require('../error/apiError');
const { buildFilters } = require('../utils/filters');

class BrandController {
  async create(req, res, next) {
    await body('name')
      .notEmpty()
      .withMessage('Field "name" is required')
      .isString()
      .withMessage('Field "name" must be a string')
      .isLength({ max: 255 })
      .withMessage('Field "name" cannot exceed 255 characters')
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()[0].msg));
    }

    const { name } = req.body;

    try {
      const brand = await Brand.create({ name });

      return res.json(brand);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next(ApiError.badRequest('Brand with this name already exists'));
      }

      return next(ApiError.internal(err.message));
    }
  }

  async getAll(req, res, next) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    try {
      const allowedFields = ['name'];

      const filters = await buildFilters(req.query, allowedFields);

      const brands = await Brand.findAndCountAll({
        where: filters,
        limit,
        offset,
      });

      return res.json(brands);
    } catch (error) {
      return next(ApiError.internal('Failed to fetch brands', error.message));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const brand = await Brand.findByPk(id);

      if (!brand) {
        // return res.status(404).json({ message: 'Brand not found' });

        return next(ApiError.notFound('Brand not found'));
      }

      return res.json(brand);
    } catch (error) {
      console.error('Unexpected error:', error);

      return next(ApiError.internal('Failed to fetch brand'));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const deletedRows = await Brand.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return next(ApiError.notFound('Brand not found'));
      }

      return res.status(204).send(); // No Content
    } catch (error) {
      return next(ApiError.internal('Failed to delete brand', error.message));
    }
  }

  async patch(req, res, next) {
    await body('name')
      .notEmpty()
      .withMessage('Field "name" is required')
      .isString()
      .withMessage('Field "name" must be a string')
      .isLength({ max: 255 })
      .withMessage('Field "name" cannot exceed 255 characters')
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()[0].msg));
    }

    const { id } = req.params;
    const updateData = req.body;
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return next(ApiError.notFound('Brand not found'));
    }

    if (Object.keys(updateData).length === 0) {
      return next(ApiError.badRequest('No data provided for update'));
    }

    try {
      const updatedBrand = await brand.update(updateData);

      return res.json(updatedBrand);
    } catch (error) {
      return next(ApiError.internal('Failed to update brand', error.message));
    }
  }
}

module.exports = new BrandController();
