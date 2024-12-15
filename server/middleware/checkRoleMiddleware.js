const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function(availableRoles) {
  return function(req, res, next) {
    try {
      const userRole = req.user.role;

      console.log(`availableRoles is ${availableRoles}`);
      console.log(`userRole is ${userRole}`);
      if (!availableRoles.includes(userRole)) {
        return next(
          ApiError.forbidden(`There is no access for role ${userRole}`)
        );
      }

      next();
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return next(ApiError.unauthorized('Token has expired'));
      } else if (e instanceof jwt.JsonWebTokenError) {
        return next(ApiError.unauthorized('Invalid token'));
      }

      return next(ApiError.unauthorized('Unauthorized user'));
    }
  };
};
