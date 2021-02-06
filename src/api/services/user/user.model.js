const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../../config/vars');

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  is_deleted: {
    type: String,
    default: '0',
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
userSchema.statics = {
  /**
  * Fetch all users
  *
  * @param {condition} condition - The where condition.
  * @param {fields}    fields    - The fields to fetch.
  * @returns {Promise<Games, APIError>}
  */
  async fetchData(condition, fields) {
    try {
      const data = await this.find(condition, fields).exec();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail() {
    return new APIError({
      message: 'The email you have entered already exists',
      errors: [{
        field: 'email',
        location: 'body',
        messages: ['"email" already exists'],
      }],
      status: httpStatus.CONFLICT,
      isPublic: true,
    });
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
