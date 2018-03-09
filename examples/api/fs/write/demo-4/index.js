const fs = require('fs');

// 可写（writable）流drain事件处理
// 复制文件，如果写入速度跟不上读取速度的话，可写（writable）流内部的缓存会溢出（如何模拟该错误？）
// 使用drain事件实现另一种复制文件的操作

const rs = fs.createReadStream('src.mp3');
const ws = fs.createWriteStream('dest.mp3');

rs.setEncoding('utf8');

rs.on('data', chunk => {
  // 如果ws.write()方法将缓存区数据写入目标文件的操作没有完成，调用rs.pause()方法暂停可读（Readable）流，并触发可写（writable）流的drain事件
  // ws.write(chunk)方法返回false,表明drain事件可以继续向流写入更多的数据
  if (!ws.write(chunk)) {
    console.log('数据写入缓存...');
    rs.pause();
  }
});

// 避免缓存溢出
ws.on('drain', () => {
  rs.resume();
});

rs.on('end', () => {
  console.log('文件复制完成');
  ws.end();
});
