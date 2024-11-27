const { Cart, CartDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');

class CartController {
  // метод не нужен, так как корзина создаётся при регистрации пользователя
  async create(req, res, next) {
    await Promise.all([
      body('userId')
        .notEmpty()
        .withMessage('Field "userId" is required')
        .isInt()
        .withMessage('Field "userId" must be a integer')
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

    try {
      let { userId } = req.body;

      if (
        Cart.findOne({
          where: { userId },
        })
      ) {
        return next(ApiError.badRequest('Cart already exists'));
      }

      const cart = await Cart.create({
        userId,
      });

      return res.status(201).json(cart);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getCart(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({
        where: { userId },
        include: {
          model: CartDevice,
          include: { model: Device },
        },
      });

      if (!cart) {
        return next(ApiError.notFound('Cart not found'));
      }

      return res.json(cart);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  /**
   * Добавление ресурса (device) в коллекцию (devices) для конкретной корзины (cartId)
   *
   * */
  async addDevice(req, res, next) {
    await body('deviceId')
      .notEmpty()
      .withMessage('Field "deviceId" is required')
      .isInt()
      .withMessage('Field "deviceId" must be a integer ')
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()[0].msg));
    }

    try {
      const userId = req.user.id;
      const { deviceId } = req.body;

      const cart = await Cart.findOne({ where: { userId } });
      const device = await Device.findByPk(deviceId);

      if (!cart) {
        return next(ApiError.notFound('Cart not found'));
      }
      if (!device) {
        return next(ApiError.notFound('Device not found'));
      }

      const cartDevice = await CartDevice.create({
        cartId: cart.id,
        deviceId,
      });

      return res.status(201).json(cartDevice);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async removeDevice(req, res, next) {
    try {
      const userId = req.user.id;
      const { cartDeviceId } = req.params;
      const cartDevice = await CartDevice.findOne({
        where: { id: cartDeviceId },
        include: {
          model: Cart,
          where: { userId },
        },
      });

      if (!cartDevice) {
        return next(ApiError.notFound('Device in cart is not found'));
      }

      await cartDevice.destroy();

      return res.status(204).json({ message: 'Device removed from cart' });
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async clearCart(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ where: { userId } });

      if (!cart) {
        return next(ApiError.notFound('Cart not found'));
      }

      await CartDevice.destroy({ where: { cartId: cart.id } });

      return res.status(204).json({ message: 'Cart cleared' });
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }
}

module.exports = new CartController();
