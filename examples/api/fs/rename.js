const fs = require('fs');
const cp = require('child_process');

const oldPath = 'test/rename-async.txt';
const newPath = 'test/rename-async-renamed.txt';

// 重置文件名，为了测试
fs.renameSync(newPath, oldPath);

fs.rename(oldPath, newPath, err => {
  if (err) throw err;
  console.log('rename complete');
});

cp.exec(`cat ${oldPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('exec error: ', error);
    return;
  }

  console.log(`cat ${oldPath} stdout: ${stdout}`);
  console.log(`cat ${oldPath} stderr: ${stderr}`);
});

cp.exec(`cat ${newPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('exec error: ', error);
    return;
  }

  console.log(`cat ${newPath} stdout: ${stdout}`);
  console.log(`cat ${newPath} stderr: ${stderr}`);
});
