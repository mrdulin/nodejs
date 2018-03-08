const fs = require('fs');

const filepath = 'test.txt';
// 当读取不存在的文件时，会触发error事件
// const fileNotPath = 'not-exist.txt';
const rs = fs.createReadStream(filepath);

rs.setEncoding('utf8');

// 当一个数据块可以从流中被读出时，触发该事件
rs.on('readable', () => {
  console.log('readable event emitted');
});

// 读取数据块
rs.on('data', chunk => {
  console.log('data event emitted, chunk: ', chunk);
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
