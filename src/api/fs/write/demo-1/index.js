const fs = require('fs');

fs.writeFile('test.txt', 'This is writed by node', err => {
  if (err) throw err;
  console.log('file saved');
});
