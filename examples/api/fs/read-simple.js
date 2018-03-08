const fs = require('fs');

fs.readFile('test/target.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
