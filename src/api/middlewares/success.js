const httpStatus = require('http-status');

/**
 * Success Response.
 * @public
 */
const successResponse = (success, req, res, next) => {
  console.log('In Success - ', success);
  const response = {
    status: 1,
    code: success.status,
    message: success.message || httpStatus[success.status],
    data: success.data,
  };
  res.status(success.status);
  res.json(response);
  res.end();
};
exports.successResponse = successResponse;
