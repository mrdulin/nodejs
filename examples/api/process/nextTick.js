// process模块的异步方法-nextTick

console.time('startB');
console.log('start - setTimeout');

setTimeout(function() {
  console.log('nextTick callback 2');
}, 0);

console.timeEnd('startB');

console.time('startA');
console.log('start - nextTick');

process.nextTick(function() {
  console.log('nextTick callback 1');
});

console.timeEnd('startA');

// 执行setTimeout计时器标记（startB）显示为个位数级别毫秒；而执行process.nextTick()，计时器标记（startA）显示为小数级别毫秒，表明process.nextTick()方法执行过程中几乎没有被阻塞

// 提示：
// Node.js是单线程执行的，除了系统I/O之外，在其事件轮询过程中，同一时间只会处理一个事件。也就是说无论用户电脑有多少个CPU核心，也无法同时并行地处理多个事件。
