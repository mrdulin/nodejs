// 使用exec方法
const cp = require('child_process');

const { exec } = cp;

exec('cat readme', (error, stdout, stderr) => {
  if (error) {
    console.error('exec error: ', error, error.code, error.signal);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
