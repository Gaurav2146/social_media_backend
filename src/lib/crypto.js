const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'HbwT@qjr9DIQucNlWfoarH#%ZdMJZ@4p';
const IV_LENGTH = 16; // For AES, this is always 16
const cyptjs = {};
cyptjs.encrypt = (text) => {
  const encryptIv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), encryptIv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${encryptIv.toString('hex')}:${encrypted.toString('hex')}`;
};

cyptjs.decrypt = function (text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
                                                      
cyptjs.passencrypt = function (data) {
  // eslint-disable-next-line node/no-deprecated-api
  const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
  let crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

cyptjs.passdecrypt = function (data) {
  // eslint-disable-next-line node/no-deprecated-api
  const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

module.exports = cyptjs;
