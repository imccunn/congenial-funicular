import crypto from 'crypto';
import {readFile, writeFile} from './fileIO';

export {
  encryptFile,
  decryptFile
}

function encryptFile(source, dest, secret) {
  console.log(`\nEncrypting file ${source} to file ${dest}.`)
  return readFile(source)
    .then(data => encryptData(data, secret))
    .then(encrypted => writeFile(dest, encrypted))
    .catch(e => { console.error(e); });
}

function decryptFile(source, dest, secret) {
  return readFile(source)
    .then(data => decryptData(data, secret))
    .catch(e => { console.error(e); });
}

function encryptData(data, secret) {
  return new Promise((resolve, reject) => {
    const cipher = crypto.createCipher('aes256', secret);
    let encrypted = '';
    cipher.on('readable', () => {
      let d = cipher.read();
      if (d) encrypted += d.toString('hex');
    });
    cipher.on('end', () => {
      console.log(`Encrypted size: ${encrypted.length}`);
      resolve(encrypted);
    });
    cipher.on('error', (e) => {
      reject(err);
    })
    cipher.write(data);
    cipher.end();
  });
}

function decryptData(data, secret) {
  return new Promise((resolve, reject) => {
    let decipher = crypto.createDecipher('aes256', secret);
    let decrypted = '';
    decipher.on('readable', () => {
      var d = decipher.read();
      if (d) {
        decrypted += d.toString('utf8');
      }
    });
    decipher.on('end', () => {
      console.log('Decipher complete.');
      resolve(decrypted);
    });
    decipher.on('error', (e) => {
      reject('Bad decrypt.');
      process.exit(1);
    });
    decipher.write(data, 'hex');
    decipher.end();
  });
}
