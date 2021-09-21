const jwt = require('jsonwebtoken');
const adminRepository = require('../repositories/admin.repository');
const crytojs = require('../lib/crypto');
const mailer = require('../helper_services/mail.service');

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

  login(obj) {
    return new Promise( async (resolve, reject) => {
      try {
        const { email, password } = obj;
        const encrypt = crytojs.passencrypt(password.toString());
        const userObj = {
          email: email,
          password: encrypt,
        };
        const data = await this.adminRepository.login(userObj);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }

  isAdminAvailable() {
    return new Promise( async(resolve, reject) => {
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

  adminLogin(obj) {
    return new Promise( async (resolve, reject) => {
      try {
        const { email, password } = obj;
        const encrypt = crytojs.passencrypt(password.toString());
        const user = await this.adminRepository.getAdminByEmail(email);
        if (encrypt === user.password) {
          jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }, async (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          });
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Please Check Your email id or Password');
        }
      } catch (e) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Please Check Your email id or Password');
      }
    });
  }

  sendPasswordResetLink() {
    return new Promise( async (resolve, reject) => {
      try {
        // eslint-disable-next-line camelcase
        const admin_detail = await this.adminRepository.getAdmin();
        console.log(admin_detail, ' admin_detail in case of forgot password ');

        mailer(admin_detail.email, 'Forgot Password Email', 'views/emailTemplate/forgotPassword.ejs', {});

        resolve(admin_detail);
      } catch (e) {
        reject(e);
      }
    });
  }
}
module.exports = AdminService;
