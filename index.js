#!/usr/bin/env node

const cryptFile = require('./src/cryptFile');
const { encryptFile, decryptFile } = cryptFile;
const postCrypt = require('./src/postCrypt');
const { displayData, filterData } = postCrypt;
const config = require('./config');
const getInput = require('./src/getInput');
const prog = require('./src/parseArgs');

const program = prog.program;
const action = prog.action;

const secret = program.key;
const source = program.sourceFile;
const dest = program.targetFile;

if (action === 'enc') {
  console.log('Encrypting file.');
  getInput('Enter key: ')
    .then(key => {
      encryptFile(source, dest, key);
    });
} else if (action === 'dec') {
  console.log('Decrypting file.');
  getInput('Enter key: ')
    .then(key => {
      return decryptFile(source, dest, key)
    })
    .then((data) => {
      const searchTerm = program.queries[0]
      const searchTerm2 = program.queries[1];
      displayData(filterData(data, searchTerm, searchTerm2));
    });
} else {
  console.log('No action supplied.');
}
