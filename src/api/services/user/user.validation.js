const Joi = require('joi');

module.exports = {

  // POST /v1/user/register
  register: {
    body: {
      firstname: Joi.string().max(128).required(),
      lastname: Joi.string().max(128).required(),
      email: Joi.string().email().required(),
      dob: Joi.date().max('now').required(),
    },
  },

};
