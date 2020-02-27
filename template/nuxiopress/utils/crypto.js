require('dotenv').config();
const CryptoJS = require('crypto-js');

const keySize = 256;
const iterations = 100;
const secretOne = process.env.APP_SECRET;
let secretTwo = CryptoJS.SHA1(secretOne);
const pass = CryptoJS.enc.Utf8.parse(secretTwo.toString().substring(0, 32));

function encryptAES(msg) {
  let salt = CryptoJS.lib.WordArray.random(128 / 8);

  let key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  });

  let iv = CryptoJS.lib.WordArray.random(128 / 8);

  let encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  return salt.toString() + iv.toString() + encrypted.toString();
}

function decryptAES(transitmessage) {
  let salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  let encrypted = transitmessage.substring(64);

  let key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  });

  let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function crypto(action, str) {
  if (typeof action !== 'string') throw new Error('>action< must be a string');

  if (action === 'enc') {
    return encryptAES(str);
  } else if (action === 'dec') {
    return decryptAES(str);
  } else {
    throw new Error('>action< must be a "enc" or "dec"');
  }
}
