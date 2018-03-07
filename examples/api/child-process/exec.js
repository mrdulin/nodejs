// 使用exec方法创建子进程

const cp = require('child_process');
const path = require('path');

const { exec } = cp;

const opts = {
  timeout: 3000,
  cwd: path.normalize(process.cwd()),
  encoding: 'utf8'
};

exec('cat readme.md', opts, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// spawn方法和exec方法的区别

// 第一、spawn方法的参数必须要放到arg数组参数中，而不能放到command参数里面，也就是说，这些参数都是不能带有空格的；而exec方法不存在这个问题，可以将参数直接放在command参数里面

// 第二、child_process模块的spawn方法在子进程开始执行时，它就开始从一个流总将数据从子进程返回给Node。具体实践中，当想要子进程返回大量数据给Node.js时（图像处理，读取二进程数据等），最好使用spawn方法。

// 第三、child_process模块的exec方法，是异步的，但是它一定要等到子进程运行结束以后再一次性返回所有的buffer数据。具体实践中，如果exec的buffer体积设置的不够大，会出现“maxBuffer exceeded”错误
