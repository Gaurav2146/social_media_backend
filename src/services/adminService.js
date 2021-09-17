const adminRepository = require('../repositories/admin.repository');
const crytojs = require('../lib/crypto');
const jwt = require('jsonwebtoken');

class AdminService {
  constructor() {
    this.adminRepository = adminRepository;
  }

  register(obj) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const { email, name, password } = obj;
        const userObj = {
          email: email,
          name: name,
          password: password,
        };      
        const encrypt = crytojs.passencrypt(password.toString());
        userObj.password = encrypt;
        const resp = await this.adminRepository.saveUser(userObj);
        resolve(resp);
      } catch (e) { 
        reject(e);
      }
    });
  }

  login(obj)
  {
    return new Promise(async (resolve, reject) => {
     try{          
      const { email, password } = obj;
      const encrypt = crytojs.passencrypt(password.toString());
      const userObj = {    
        email: email,
        password: encrypt,
      };  
      const data = await this.adminRepository.login(userObj);
      resolve(data);
     }
     catch(e)
     {
      reject(e);
     }
    })
  }

  isAdminAvailable() {
    return new Promise(async (resolve, reject) => {
      try {
        const isAvailable = await this.adminRepository.isAdminAvailable();
        resolve(isAvailable);
      } catch (e) {
        reject(e);
      }
    });
  }


  getUsersList() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const list = await this.adminRepository.getUsers();
        resolve(list);
      } catch (e) {
        reject(e);
      }
    });
  }


adminLogin(obj)
{
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = obj;
      const encrypt = crytojs.passencrypt(password.toString());
      let user = await this.adminRepository.getAdminByEmail(email);
      if (encrypt === user.password) {
        jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }, async (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        })
      }
      else {
        reject('Please Check Your email id or Password');
      }
    }
    catch (e) {
      reject('Please Check Your email id or Password');
    }
  })
}


}
module.exports = AdminService;
