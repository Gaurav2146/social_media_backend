const Admin = require('../model/admin');

const adminRepository = {
  saveUser: (userObj) => Admin.create(userObj),
  getUsers: () => Admin.find(),
  login: (userObj)=> Admin.findOne(userObj,{password:0}),
  isAdminAvailable: ()=> Admin.find()
};

module.exports = adminRepository;
