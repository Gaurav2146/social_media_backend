/* eslint-disable no-async-promise-executor */
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const crytojs = require('../lib/crypto');
const mailer = require('../helper_services/mail.service');

class UserService {
  constructor() {
    this.userRepository = userRepository;
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
        const resp = await this.userRepository.saveUser(userObj);
        resolve(resp);
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
        const user = await this.userRepository.getAdminByEmail(email);
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
        reject('Please Check Your email id or Password');
      }
    });
  }

  sendPasswordResetLink() {
    return new Promise(async (resolve, reject) => {
      try {
        const admin_detail = await this.userRepository.getAdmin();
        console.log(admin_detail.email, ' admin_detail in case of forgot password ');
        let admin_jwt = jwt.sign({ email: admin_detail.email }, admin_detail.password, { expiresIn: 60 * 60 * 24 });

        let mail_res = await mailer(admin_detail.email, 'Forgot Password Email', 'views/emailTemplate/forgotPassword.ejs', {
          admin_jwt: admin_jwt,
        });

        resolve(mail_res);
      } catch (e) {
        reject(e);
      }
    });
  }

  verifyPasswordResetLink(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const admin_detail = await this.userRepository.getAdmin();
        let detail = jwt.verify(token, admin_detail.password);
        if (admin_detail.email === detail.email) {
          resolve('Verified Successfully');
        } else {
          reject('Verification Failed');
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  // eslint-disable-next-line camelcase
  resetPassword(jwt_token, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const admin_detail = await this.userRepository.getAdmin();
        let detail = jwt.verify(jwt_token, admin_detail.password);
        if (admin_detail.email === detail.email) {
          let encrypted_password = crytojs.passencrypt(password.toString());
          const detail = await this.userRepository.updatePassword(encrypted_password);
          resolve(detail);
        } else {
          reject('Verification Failed');
        }
      } catch (e) {
        reject(e);
      }
    });
  }


  

   // eslint-disable-next-line camelcase
   addFollower(followerId , user_Id ) {
    return new Promise(async (resolve, reject) => {
      try {
        const detail = await this.userRepository.addFollower( followerId , user_Id );
        resolve(detail);
      } catch (e) {
        reject(e);
      }
    });
  }

   // eslint-disable-next-line camelcase
   removeFollower(followerId , user_Id ) {
    return new Promise(async (resolve, reject) => {
      try {
        const detail = await this.userRepository.removeFollower( followerId , user_Id );
        resolve(detail);
      } catch (e) {
        reject(e);
      }
    });
  }


  getUsersToFollow(userId)
  {
    return new Promise(async (resolve, reject) => {
      try {
        const detail = await this.userRepository.getUsersToFollow( userId );
        resolve(detail);
      } catch (e) {
        reject(e);
      }
    });
  }

}

module.exports = UserService;
