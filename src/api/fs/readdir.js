const fs = require('fs');

fs.readdir('./write', (err, files) => {
  if (err) throw err;
  console.log(files);
});
