const fs = require('fs');

fs.realpath('./test/target.txt', (err, resolvedPath) => {
  if (err) throw err;
  console.log(resolvedPath);
});
