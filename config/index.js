import fs from 'fs';
import path from 'path';

let packageData = fs.readFileSync(path.resolve(process.cwd() + '/package.json'), 'utf-8');

export default {
  version: '0.1.0',
  package: JSON.parse(packageData)
}
