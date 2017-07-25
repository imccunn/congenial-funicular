#!/usr/bin/env node

import fs from 'fs';

import { encryptFile, decipherFile } from './src/cryptFile';
import { postDecipher } from './src/postCrypt';

const args = process.argv;
const secret = fs.readFileSync('./.secret', 'utf8');

let actOpt = args[2];
let source = args[3];
let dest = args[4];
let searchTerm = args[5];
let searchTerm2 = args[6];

const ENC = '-e';
const DEC = '-d';

switch (actOpt) {
  case ENC : encryptFile(source, dest, secret);
    break;
  case DEC : postDecipher(source, dest, secret, searchTerm, searchTerm2);
    break;
  default : throw new Error('Bad opts');
    break;
}
