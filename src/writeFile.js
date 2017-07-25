
import fs from 'fs';

function writeToFile(dest, data, cb) {
  fs.writeFile('./' + dest, data, (err) => {
    if (err) return cb(err);
    console.log('Decrypted file written.')
    cb();
  });
}

export default writeToFile;
