const User = require('../model/user');
const { user } = require('../routes');

const userRepository = {
  saveUser: (userObj) => User.create(userObj,{password:0}),
  getUsers: () => User.find(),
  login: (userObj)=> User.findOne(userObj,{password:0})
};

module.exports = userRepository;
