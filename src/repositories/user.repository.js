const User = require('../model/user');

const userRepository = {
  saveUser: (userObj) => User.create(userObj),
  getUsers: () => User.find(),
};

module.exports = userRepository;
