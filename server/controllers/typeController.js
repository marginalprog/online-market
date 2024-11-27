const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');
const { buildFilters } = require('../utils/filters');

class TypeController {
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
      const type = await Type.create({ name });

      return res.status(201).json(type);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next(ApiError.badRequest('Type with this name already exists'));
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

      const types = await Type.findAndCountAll({
        where: filters,
        limit,
        offset,
      });

      return res.json(types);
    } catch (error) {
      return next(ApiError.internal('Failed to fetch types', error.message));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const type = await Type.findByPk(id);

      if (!type) {
        return next(ApiError.notFound('Type not found'));
      }

      return res.json(type);
    } catch (error) {
      return next(ApiError.internal('Failed to fetch type', error.message));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const deletedRows = await Type.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return next(ApiError.notFound('Type not found'));
      }

      return res.status(204).send(); // No Content
    } catch (error) {
      return next(ApiError.internal('Failed to delete type', error.message));
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
    const type = await Type.findByPk(id);
    const updateData = req.body;

    if (!type) {
      return next(ApiError.notFound('Type not found'));
    }

    if (Object.keys(updateData).length === 0) {
      return next(ApiError.badRequest('No data provided for update'));
    }

    try {
      const updatedType = await type.update(updateData);

      return res.json(updatedType);
    } catch (error) {
      return next(ApiError.internal('Failed to update type', error.message));
    }
  }
}

module.exports = new TypeController();
