const Admin = require('../model/admin');

const adminRepository = {

  saveUser: (userObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await Admin.create(userObj)
        resolve(admin);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  login: (userObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await Admin.findOne(userObj, { password: 0 });
        resolve(admin);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },


  isAdminAvailable: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await Admin.find();
        resolve(admin);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  getAdminByEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await Admin.findOne({ email: email })
        resolve(admin);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  getAdmin: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await Admin.findOne({});
        resolve(admin);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  updatePassword : (password) =>{
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await Admin.findOneAndUpdate({ password : password });
        resolve(admin);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  } 

};

module.exports = adminRepository;
