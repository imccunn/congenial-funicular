const fs = require('fs');

module.exports = {
  readFile,
  writeFile
};

function readFile(path) {
  return new Promise((resolve, reject) => {
    console.log(`Reading file: ${path}`);
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    console.log(`Writing file ${path} (${data.length})`);
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
