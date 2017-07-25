#!/usr/bin/env node

import fs from 'fs';

import { encryptFile, decipherFile } from './src/cryptFile';
import { postDecipher } from './src/postCrypt';

const args = process.argv;
const secret = fs.readFileSync('./.secret', 'utf8');
const actOpt = args[2];
const source = args[3];
const dest = args[4];
const searchTerm = args[5];
const searchTerm2 = args[6];

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
