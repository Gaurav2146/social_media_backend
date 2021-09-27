const Admin = require('../model/admin');

const adminRepository = {

  saveUser: (userObj) => {
    try {
      return Admin.create(userObj)
    } catch (error) {
      console.log(error);
    }
  },

  login: (userObj) => {
    try {
      return Admin.findOne(userObj, { password: 0 });
    } catch (error) {
      console.log(error);
    }
  },


  isAdminAvailable: () => {
    try {
      return Admin.find();
    } catch (error) {
      console.log(error);
    }
  },

  getAdminByEmail: (email) => {
    try {
      return Admin.findOne({ email: email })
    } catch (error) {
      console.log(error);
    }
  },

  getAdmin: () => {
    try {
      return Admin.findOne({})
    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = adminRepository;
