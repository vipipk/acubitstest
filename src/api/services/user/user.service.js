const User = require('./user.model');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

/**
 * Returns user details if registration was successful
 * @public
 */
exports.register = async (userData) => {
  console.log('userData ---------------------- ', userData);
  try {
    if (!await this.emailExists(userData.email)) {
      const user = await new User(userData).save();
      console.log('Saved User ----------------------------------------- ', user);
      return { user };
    } else {
      throw User.checkDuplicateEmail();
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Check whether email exists
 * @public
 */
exports.emailExists = async (email) => {
  const where = { email };
  const emailCount = await User.find(where).count().exec();
  if (emailCount > 0) return true;
  return false;
};
