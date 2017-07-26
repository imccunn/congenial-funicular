
import { decryptFile } from './cryptFile';
import { mapRowsToObjs } from './mapData';
import { exec } from 'child_process';

function postDecipher(source, dest, secret, searchTerm, searchTerm2) {
  decryptFile(source, dest, secret, (err, data) => {
    if (err) return console.log(err);
    let map = mapRowsToObjs(data);
    let found = [];
    let foundAcntSource = null;
    if (searchTerm) {
      for (let acntI in map) {
        let accnt = map[acntI];
        let termMatch1 = accnt.account.match(new RegExp(searchTerm, 'g'));
        let emailMatch = accnt.email.match(new RegExp(searchTerm2, 'g'));
        let usernameMatch = accnt.username.match(new RegExp(searchTerm2, 'g'));
        if (termMatch1) {
          if (searchTerm2 && (emailMatch !== null || usernameMatch !== null)) {
            found.push(accnt);
            foundAcntSource = accnt;
          } else if (!searchTerm2) {
            found.push(accnt);
            foundAcntSource = accnt;
          }
        }
      }
    }
   console.log('> ', found.length !== 1 ? 'unable to target account' : `${found[0].pw} -- ${found[0].email}`);
   setTimeout(function() {
      exec('clear && exit', (err, stdo, stde) => {
        if (err) return process.exit(0);
        console.log(stdo, stde);
      });
   }, 2000);
  });
}

export {
  postDecipher
}
