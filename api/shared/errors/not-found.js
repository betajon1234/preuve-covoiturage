const NotFoundError = function NotFoundError(message = 'Not Found') {
  this.message = message;
};

NotFoundError.prototype = new Error();
NotFoundError.prototype.name = 'NotFoundError';

module.exports = NotFoundError;
