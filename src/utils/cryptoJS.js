import CryptoJS from 'crypto-js'
import jsonFile from './generate.json'
const k82 = CryptoJS.enc.Utf8.parse(jsonFile[4]._0x6p1sl2Ty1c.slice(5,21))
const i5T = CryptoJS.enc.Utf8.parse(jsonFile[7]._0x2Fr3Rhv8T.slice(25,41))
const kpQ = CryptoJS.enc.Utf8.parse(jsonFile[9]._0xP9sGWyw62fst.slice(2,18))
const iGS = CryptoJS.enc.Utf8.parse(jsonFile[11]._0x9VfsYW7hs1f7.slice(0,16))
//解密方法
export const dataDecrypt = function (word){
    let decrypt = CryptoJS.AES.decrypt(word, k82, { iv: i5T, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

 //加密方法
export const dataEncrypt = function (word){
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, k82, { iv: i5T, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

export const tokenEncrypt = function (word){
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, kpQ, { iv: iGS, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

export const tokenDecrypt = function (word){
    let decrypt = CryptoJS.AES.decrypt(word, kpQ, { iv: iGS, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}