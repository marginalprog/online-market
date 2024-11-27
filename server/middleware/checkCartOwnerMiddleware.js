const { Cart } = require('../models'); // Модель Cart
const ApiError = require('../error/ApiError');

module.exports = function(role) {
  return async function(req, res, next) {
    try {
      const { cartId } = req.params;
      const userId = req.user.id;

      // Проверяем существование корзины
      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        return next(ApiError.notFound('Cart not found'));
      }

      // Проверяем принадлежность корзины пользователю
      if (cart.userId !== userId) {
        return next(ApiError.forbidden('You do not have access to this cart'));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
