const fs = require('fs');

fs.writeFile('target.txt', 'This is writed by node', err => {
  if (err) throw err;
  console.log('file saved');
});
