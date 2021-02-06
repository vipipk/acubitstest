const httpStatus = require('http-status');
const userService = require('./user.service');
const { handler: errorHandler } = require('../../middlewares/error');
const { successResponse } = require('../../middlewares/success');
const APIError = require('../../utils/APIError');
const mongoose = require('mongoose');

/**
 * Returns user details if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    let messageText = 'Account is created successfully';
    return successResponse({
      status: httpStatus.CREATED,
      message: messageText,
      data: { result },
    }, req, res);
    // return res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    console.log('In error ======== ', error);
    return next(error);
  }
};


/**
* Check whether email exists
* @public
*/
exports.emailExists = async (req, res, next) => {
  try {
    const result = await userService.emailExists(req.body.email);
    return successResponse({
      status: httpStatus.OK,
      message: '',
      data: { result },
    }, req, res);
  } catch (error) {
    return next(error);
  }
};

