const fs = require('fs');

// 暂停与恢复可读（Readable）流

// 说明：暂停可读（Readable）流方法会使一个处于流动模式的流停止触发`data`事件，切换到非流动模式，
// 并让后续可用数据留在内部缓冲区中。

const filepath = 'test.txt';
const rs = fs.createReadStream(filepath);

rs.setEncoding('utf8');

// 当一个数据块可以从流中被读出时，触发该事件
rs.on('readable', () => {
  console.log('readable event emitted');
});

// 读取数据块
rs.on('data', chunk => {
  console.log(`读取${filepath}文本文件的内容...`);
  console.log(`读取到了${chunk.length}字节的数据`);

  // 暂停一个可读（Readable）流
  rs.pause();
  console.log('接下来的3秒不会有数据...');
  setTimeout(() => {
    console.log('现在数据会再次开始流动...');
    // 恢复一个可读（Readable）流
    rs.resume();
    console.log('读取到的数据：\n', chunk);
  }, 3000);
});

// 当数据接收发生错误时被触发
rs.on('error', () => {
  console.log('error event emitted');
});

// 没有更多数据能够提供时被触发
rs.on('end', () => {
  console.log('end event emitted');
});

// 当底层数据源（例如数据源的文件描述符）被关闭时触发；并不是所有流都会触发close事件
rs.on('close', () => {
  console.log('close event emitted');
});
