const jwt = require('jsonwebtoken');
const adminRepository = require('../repositories/admin.repository');
const crytojs = require('../lib/crypto');
const mailer = require('../helper_services/mail.service');

class AdminService {
  constructor() {
    this.adminRepository = adminRepository;
  }

  register(obj) {
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

  adminLogin(obj) {
    return new Promise(async (resolve, reject) => {
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
          reject('Please Check Your email id or Password');
        }
      } catch (e) {
        reject('Please Check Your email id or Password');
      }
    });
  }

  sendPasswordResetLink() {
    return new Promise(async (resolve, reject) => {
      try {
        const admin_detail = await this.adminRepository.getAdmin();
        console.log( admin_detail.email , ' admin_detail in case of forgot password ');
        let admin_jwt =  jwt.sign({ email : admin_detail.email }, admin_detail.password , { expiresIn: 60 * 60 * 24 } );
      
        let mail_res = await mailer(admin_detail.email, 'Forgot Password Email', 'views/emailTemplate/forgotPassword.ejs', { admin_jwt : admin_jwt });
      
        resolve(mail_res);
      } catch (e) {
        reject(e);
      }
    });
  }


  verifyPasswordResetLink(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const admin_detail = await this.adminRepository.getAdmin();
        let detail = jwt.verify(token, admin_detail.password);
        if (admin_detail.email === detail.email) {
          resolve('Verified Successfully');
        }
        else {
          reject('Verification Failed');
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  resetPassword(jwt_token , password ){
    return new Promise(async (resolve, reject) => {
      try {
        const admin_detail = await this.adminRepository.getAdmin();
        let detail = jwt.verify(jwt_token, admin_detail.password);
        if (admin_detail.email === detail.email) {
          let encrypted_password = crytojs.passencrypt(password.toString());
          const detail = await this.adminRepository.updatePassword(encrypted_password);
          resolve(detail);
        }
        else {
          reject('Verification Failed');
        }
      } catch (e) {
        reject(e);
      }
    });
  }


}

module.exports = AdminService;
