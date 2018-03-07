var child_process = require('child_process'),
  path = require('path');

var exec = child_process.exec,
  opts = {
    timeout: 3000,
    cwd: path.normalize(process.cwd()),
    encoding: 'utf8'
  };

exec('cat *.js | wc -l', opts, function(err, stdout, stderr) {
  if (err) {
    console.log(err.code);
    return;
  }
  console.log(stdout);
});
