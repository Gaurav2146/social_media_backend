/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const AdminService = require('../services/adminService');
const adminService = new AdminService();
const crytojs = require('../lib/crypto');
const jwt = require('jsonwebtoken');

const Admin = require('../model/admin');

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
      if (!confirmPassword) {
        throw new BadRequest('Confirm Password is required');
      }
      if (password !== confirmPassword) {
        throw new InternalServerError('Password and Confirm Password not match');
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
  }
  ,
  getUsers: async function (req, res) {
    try {
      const userList = await adminService.getUsersList();
      return res.status(200).json(userList);
    } catch (e) {
      return res.status(400).json({ message: 'something went wrong!' });
    }
  },


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * User login API 
 * @param {String} email;
 * @param {String} password;
 */

adminLogin: async function (req, res, next) {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();

      Admin.findOne({ email: email }).then(async (user) => {
        if (user) {
          const encrypt = crytojs.passencrypt(password.toString());
          if (encrypt === user.password) {

            jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }, async (err, token) => {
              if (err) {
                res.status(400).json({ success: false, msg: "Unable to login!", type: 'login' });
              } else {
                res.status(200).json({ token, success: true, msg: 'Login Successfully', type: 'login' });
              }
            })
          } else {
            res.status(400).json({ success: false, msg: 'Please check your email or password', type: 'details not match' });
          }
        } else {
          res.status(400).json({ success: false, msg: "Please check your email or password", openResend: true, type: 'email not verified' })
        }
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, msg: 'Email addrress doesnt match any account', type: 'invalid email' });
      })

    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Something went wrong!', type: 'main catch', error: error });
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

module.exports = adminCtl;
