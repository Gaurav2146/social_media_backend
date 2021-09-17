const Admin = require('../model/user');

const adminRepository = {
  saveUser: (userObj) => Admin.create(userObj),
  getUsers: () => Admin.find(),
  login: (userObj)=> Admin.findOne(userObj,{password:0})
};

module.exports = adminRepository;
