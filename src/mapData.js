
/**
 * Converts CSV file content into a list of objects whose keys are
 * identified by the first row.
 *
 * @param  {String} csv utf-8 file content
 * @return {[type]}     [description]
 */
function mapRowsToObjs(csv) {
  let trimmedRows = csv.split(/\r\n/g);
  trimmedRows = trimmedRows.filter(r => {return r.split(',')[0] !== '';});
  let fields = trimmedRows[0].split(',').filter(v => v !== '');
  trimmedRows.shift();
  return trimmedRows
    .map(r => r.split(',').splice(0, fields.length))
    .map((row) => {
      return row.reduce((p, c, i) => {
        return {
          ...p,
          [fields[i]]: c
        };
      }, {});
    });
}

export {
  mapRowsToObjs
}
