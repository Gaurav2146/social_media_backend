const { BadRequest } = require('http-errors');
const isHttpError = require('http-errors');
const UserService = require('../services/userService');

const userService = new UserService();

const adminCtl = {
  // eslint-disable-next-line consistent-return
  registration: async function (req, res, next) {
    try {
      const { email, name, password } = req.body;

      if (!email) {
        throw new BadRequest('Email is required');
      }
      if (!name) {
        throw new BadRequest('Name is required');
      }
      if (!password) {
        throw new BadRequest('Password is required');
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


  adminLogin: async function (req, res) {
    try {
      // eslint-disable-next-line prefer-const
      let { email, password } = req.body;
      email = email.toLowerCase();
      userService
        .adminLogin({ email, password })
        .then((token) => {
          res.status(200).json({ token, success: true, msg: 'Login Successfully', type: 'login' });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false, msg: error });
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  },

  sendPasswordResetLink: async function (req, res) {
    try {
      userService
        .sendPasswordResetLink()
        .then((data) => {
          res.status(200).json({ success: true, msg: data });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false, msg: error });
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  },

  verifyPasswordResetLink: async function (req, res) {
    try {
      const { jwt } = req.query;
      userService
        .verifyPasswordResetLink(jwt)
        .then((data) => {
          res.status(200).json({ success: true, msg: data });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false, msg: error });
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  },

  resetPassword: async function (req, res) {
    try {
      const { jwt, password } = req.body;
      userService
        .resetPassword(jwt, password)
        .then((data) => {
          res.status(200).json({ success: true, msg: data });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false, msg: error });
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  },

  addFollower :  async function (req, res) {
    try {
      const { followerId } = req.body;
      let user_Id = req.user.user._id;
      userService.addFollower(followerId , user_Id ).then((data) => {
          res.status(200).json({ success: true, msg: data });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false, msg: error });
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  },

};

module.exports = adminCtl;
