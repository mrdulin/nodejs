// 使用execFile创建子进程

const cp = require('child_process');

const { execFile } = cp;

execFile('/bin/ls', ['-lh', '.'], (error, stdout, stderr) => {
  if (error) {
    console.error('execFile error: ', error);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// 跟.exec()类似，不同点在于，没有创建一个新的shell。至少有两点影响

// 比child_process.exec()效率高一些。（实际待测试）
// 一些操作，比如I/O重定向，文件glob等不支持。
