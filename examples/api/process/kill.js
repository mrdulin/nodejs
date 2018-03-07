// kill当前进程

console.log('当前进程id: ', process.pid);

process.on('SIGHUP', function() {
  console.log('Got SIGHUP signal');
});

setTimeout(() => {
  console.log('Exiting...');
  process.exit(0);
  console.log('已经退出进程id: ', process.pid);
}, 1000);

process.kill(process.pid, 'SIGHUP');
console.log('正在退出进程id: ', process.pid);

// process.kill()方法执行后，第17行的提示信息也正常打印输出了，表明process.kill()方法并没有kill当前进程
// process.exit(0)方法执行后，后面的console.log没有正常打印输出，表明process.exit(0)方法杀死了当前进程

// process.kill与unix/linux系统命令kill不一样，该方法仅仅是一个信号发送器
