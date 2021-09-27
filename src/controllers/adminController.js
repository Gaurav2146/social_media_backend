const { BadRequest } = require('http-errors');
const isHttpError = require('http-errors');
const AdminService = require('../services/adminService');
const adminService = new AdminService();

const adminCtl = {
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
      const userObj = await adminService.register({ email, name, password });
      res.status(200).json(userObj);
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  }, 

  isAdminAvailable: async function (req, res, next) {
    try {
      const isAvailable = await adminService.isAdminAvailable();
      if (isAvailable.length > 0) {
        return res.status(200).json({ success: true, isAvailable: true });
      }
      return res.status(200).json({ success: true, isAvailable: false });
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
      let { email, password } = req.body;
      email = email.toLowerCase();
      adminService.adminLogin({ email, password}).then((token) => {
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
      adminService
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
      let {jwt} = req.query;
      adminService.verifyPasswordResetLink(jwt).then((data) => {
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
      let {jwt , password } = req.body;
      adminService.resetPassword(jwt , password ).then((data) => {
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
