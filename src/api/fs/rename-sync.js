const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const { exec } = cp;
const oldPath = path.resolve(__dirname, 'test/rename-sync.txt');
const newPath = path.resolve(__dirname, 'test/rename-sync-renamed.txt');

console.time('fs-rename-sync');
fs.renameSync(newPath, oldPath);
fs.renameSync(oldPath, newPath);
console.timeEnd('fs-rename-sync');

exec(`cat ${oldPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('exec error: ', error);
    return;
  }

  console.log(`cat ./test/rename-sync.txt stdout: ${stdout}`);
  console.log(`cat ./test/rename-sync.txt stderr: ${stderr}`);
});

exec(`cat ${newPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('exec error: ', error);
    return;
  }

  console.log(`cat ./test/rename-sync-renamed.txt stdout: ${stdout}`);
  console.log(`cat ./test/rename-sync-renamed.txt stderr: ${stderr}`);
});
