const fs = require('fs');
const path = require('path');

let packageData = fs.readFileSync(path.resolve(process.cwd() + '/package.json'), 'utf-8');

module.exports = {
  version: '0.1.0',
  package: JSON.parse(packageData)
};
