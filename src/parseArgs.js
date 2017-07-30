import program from 'commander';
import config from '../config/index';

let cmdVal = null;
program
  .arguments('<cmd>')
  .action(function(cmd) {
    cmdVal = cmd;
  });

program
  .version(config.package.version)
  .option('-s, --source-file [path]', 'Source file.', val)
  .option('-t, --target-file [path]', 'Target file.', val)
  .option('-k, --key [path]', 'key.')
  .option('-q, --queries [list]', 'List of search terms.', list);

program.parse(process.argv);

function list(val) {
  return val.split(',').map(item => item.trim());
}

function val(v) {
  return v;
}

export default {
  action: cmdVal,
  program
};
 
