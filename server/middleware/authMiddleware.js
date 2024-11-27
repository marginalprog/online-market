const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  if (!req.headers.authorization) {
    return next(ApiError.unauthorized('Authorization header is missing'));
  }

  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

    if (!token) {
      return next(ApiError.unauthorized('Unauthorized user'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

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
