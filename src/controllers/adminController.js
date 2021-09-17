/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const AdminService = require('../services/adminService');
const adminService = new AdminService();

const adminCtl = {
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
      // if (!confirmPassword) {
      //   throw new BadRequest('Confirm Password is required');
      // }
      // if (password !== confirmPassword) {
      //   throw new InternalServerError('Password and Confirm Password not match');
      // }
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
  login: async function (req, res, next) {     
    try {
      const { email, password } = req.body;
      const userObj = await adminService.login({ email, password });
      return res.status(200).json({userObj : userObj});
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  isAdminAvailable:  async function (req, res, next) {     
    try {
      const isAvailable = await adminService.isAdminAvailable();
      if(isAvailable.length > 0)
      {
        return res.status(200).json({ success : true , isAvailable : true});
      }
      else
      {
        return res.status(200).json({ success : true , isAvailable : false});
      }
      
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
      const userList = await adminService.getUsersList();
      return res.status(200).json(userList);
    } catch (e) {
      return res.status(400).json({ message: 'something went wrong!' });
    }
  },

  adminLogin: async function (req, res, next) {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();
      adminService.adminLogin({ email, password }).then((token) => {
        res.status(200).json({ token, success: true, msg: 'Login Successfully', type: 'login' });
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, msg: error });
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  }

};

module.exports = adminCtl;
