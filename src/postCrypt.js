
import { decryptFile } from './cryptFile';
import { mapRowsToObjs } from './mapData';
import { exec } from 'child_process';

export {
  displayData,
  filterData
}

function displayData(res) {
  process.stdout.write(res);
  setTimeout(() => {
    process.stdout.write('\x1B[2K\x1B[200D');
    // clear screen
    // process.stdout.write('\u001b[H\u001b[2J');
    process.exit(0);
  }, 2000);
}

function filterData(data, searchTerm, searchTerm2) {
  const map = mapRowsToObjs(data);
  let found = [];
  let foundAcntSource = null;
  if (searchTerm) {
    for (let acntI in map) {
      let accnt = map[acntI];
      let termMatch1 = accnt.site.match(new RegExp(searchTerm, 'g'));
      let emailMatch = accnt.Email.match(new RegExp(searchTerm2, 'g'));
      let usernameMatch = accnt.Username.match(new RegExp(searchTerm2, 'g'));
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
  return found.length !== 1 ? `Unable to find data.` : `${found[0].pw} -- ${found[0].Email}`;
}
