class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;

    // Явно указываем прототип для совместимости
    Object.setPrototypeOf(this, new.target.prototype);

    // Добавляем метку для дополнительной проверки
    this.isApiError = true;
  }

  static badRequest(message) {
    return new ApiError(400, `Bad Request: ${message}`);
  }

  static unauthorized(message) {
    return new ApiError(401, `Unauthorized: ${message}`);
  }

  static forbidden(message) {
    return new ApiError(403, `Forbidden: ${message}`);
  }

  static notFound(message) {
    return new ApiError(404, `Not Found: ${message}`);
  }

  static internal(message) {
    return new ApiError(500, `Internal Server Error: ${message}`);
  }
}

module.exports = ApiError;
