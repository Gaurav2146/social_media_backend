const User = require('../model/user');

const userRepository = {
  saveUser: (userObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.create(userObj);
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  login: (userObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne(userObj, { password: 0 });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },


  getAdminByEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ email: email });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getAdmin: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({});
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  updatePassword: (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOneAndUpdate({ password: password });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  addFollower : ( followerId , user_Id ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findByIdAndUpdate({ _id : user_Id } , { $push : { following  : followerId } });
        let following_user = await User.findByIdAndUpdate({ _id : followerId } , { $push : { followers  : user_Id } });
        resolve({user , following_user});
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

};

module.exports = userRepository;
