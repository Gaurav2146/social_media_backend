/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const UserService = require('../services/userService');

const userService = new UserService();

const uploadController = {
  // eslint-disable-next-line consistent-return
  registration: async function (req, res, next) {
    try {
      const { email, name, password, confirmPassword } = req.body;

      if (!email) {
        throw new BadRequest('Email is required');
      }
      if (!name) {
        throw new BadRequest('Name is required');
      }
      if (!password) {
        throw new BadRequest('Password is required');
      }
      if (!confirmPassword) {
        throw new BadRequest('Confirm Password is required');
      }

      if (password !== confirmPassword) {
        throw new InternalServerError('Password and Confirm Password not match');
      }

      const userObj = await userService.register({ email, name, password });
      res.status(200).json(userObj);
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  },                       
  login: function (req, res, next) {     
    try {
      return res.status(200).json('user login');
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getUsers: async function (req, res) {
    try {
      const userList = await userService.getUsersList();
      return res.status(200).json(userList);
    } catch (e) {
      return res.status(400).json({ message: 'something went wrong!' });
    }
  },
};

module.exports = uploadController;
