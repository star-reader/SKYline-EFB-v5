import CryptoJS from 'crypto-js'
import jsonFile from './generate.json'
const app_key = CryptoJS.enc.Utf8.parse('sgdgwt26dgsfw621')
const app_iv = CryptoJS.enc.Utf8.parse('8xGSYvbwfy8FSZSq'
//解密方法
export const dataDecrypt = function (word){
    let decrypt = CryptoJS.AES.decrypt(word, app_key, { iv: app_iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

 //加密方法
export const dataEncrypt = function (word){
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, app_key, { iv: app_iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
