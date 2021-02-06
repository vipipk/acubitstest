const express = require('express');
const validate = require('express-validation');
const controller = require('./user.controller');
const {
  register,
  emailExists,
} = require('./user.validation');

const router = express.Router();

router
  .route('/register')
  /**
   * @api {post} v1/users/register Register
   * @apiDescription Register a new user
   * @apiVersion 1.0.0
   * @apiName Register
   * @apiGroup User
   * @apiPermission private
   *
   * @apiParam  {String}    name         User's first name
   * @apiParam  {String}    name         User's last name
   * @apiParam  {String}    email        User's email address
   * @apiParam  {String}    dob          User's date of birth
   *
   * @apiSuccess (Created 201) {integer} status   Status code [1 for success & 0 for failure].
   * @apiSuccess (Created 201) {integer} code     HTTP HTTP status code.
   * @apiSuccess (Created 201) {String}  message  Message returned.
   * @apiSuccess (Created 201) {Object[]}  data     Object containing User details.
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   */
  .post(validate(register), controller.register);
  
module.exports = router;
