#!/usr/bin/env node

import { encryptFile, decryptFile } from './src/cryptFile';
import { displayData, filterData } from './src/postCrypt';
import config from './config/index';
import getInput from './src/getInput';
import prog from './src/parseArgs';

const program = prog.program;
const action = prog.action;

const secret = program.key;
const source = program.sourceFile;
const dest = program.targetFile;

console.log('action: ', action);
if (action === 'enc') {
  getInput('Enter key: ')
    .then(key => {
      encryptFile(source, dest, key);
    });
} else if (action === 'dec') {
  getInput('Enter key: ')
    .then(key => {
      return decryptFile(source, dest, key)
    })
    .then((data) => {
      const searchTerm = program.queries[0]
      const searchTerm2 = program.queries[1];
      return displayData(filterData(data, searchTerm, searchTerm2));
    });
} else {
  console.log('No action supplied.');
}

