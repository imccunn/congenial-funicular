import fs from 'fs';
import crypto from 'crypto';
import { mapAccountData, mapRowsToObjs } from './mapData';

function encryptFile(source, dest, secret) {
  console.log(`\nEncrypting file ${source} to file ${dest}.`)
  fs.readFile(source, 'utf-8', function(err, data) {
    if (err) return console.log(err);
    console.log(`Source file size: ${data.length}`)
    let mappedAccounts = mapRowsToObjs(data);
    const cipher = crypto.createCipher('aes256', secret);
    let encrypted = '';
    cipher.on('readable', () => {
      let d = cipher.read();
      if (d) encrypted += d.toString('hex');
    });
    cipher.on('end', () => {
      fs.writeFile(dest, encrypted, (err) => {
        if (err) return console.log(err);
        console.log(`File encrypted. Size: ${encrypted.length}`);
       });
    });
    cipher.write(data);
    cipher.end();
  });
}

function decryptFile(source, dest, secret) {
  return new Promise((resolve, reject) => {
    console.log(`Decrypting file  ${source}.`);
    fs.readFile(source, 'utf8', (err, data) => {
      if (err) return reject(err);
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
        console.error('Bad decrypt.');
        reject('Bad decrypt.');
        process.exit(1);
      });
      decipher.write(data, 'hex');
      decipher.end();
    });
  });
}

export {
  encryptFile,
  decryptFile
}

