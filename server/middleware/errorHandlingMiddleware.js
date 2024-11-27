// ошибка, запрос, ответ, управление следующему мв
module.exports = function(err, req, res, next) {
  const ApiError = require('../error/ApiError');

  console.log('Middleware called with error:', err);
  console.log('Error prototype:', Object.getPrototypeOf(err));
  console.log('Is instance of ApiError:', err instanceof ApiError);

  console.log('Error details:', {
    message: err.message,
    status: err.status,
    name: err.name,
    constructor: err.constructor.name,
    prototypeMatch: Object.getPrototypeOf(err) === ApiError.prototype,
    isApiError: err instanceof ApiError,
  });

  // fixme: instanceof ApiError = false для brand. why?
  //  prototypeMatch stay be false

  // if (err instanceof ApiError) {
  if (err instanceof ApiError || err.isApiError) {
    console.log('Handling ApiError:', err);

    return res.status(err.status).json({ message: err.message });
  }

  console.log('Unhandled error:', err);

  return res.status(500).json({ message: 'Unhandled error' });
};
