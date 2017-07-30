import readline from 'readline';

function getInput(query) {
  return new Promise((resolve, reject) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let stdin = process.openStdin();
    let dataHandler = (char) => {
      switch (char) {
        case '\r':
        case '\n':
          stdin.removeListener('data', dataHandler);
          break;
        default:
          process.stdout.write('\x1B[2K\x1B[200D' + query);
          break;
      }
    }
    process.stdin.on('data', dataHandler);
    rl.question(query, (key) => {
      rl.close();
      resolve(key);
    });
  });
}

export default getInput;

