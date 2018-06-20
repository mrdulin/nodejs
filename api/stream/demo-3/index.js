const stream = require('stream');

// 使用可读（Readable）流发送数据

const rs = new stream.Readable();

// push方法将字符串或Buffer类型数据发送给接收方
// 可读流在接收者没有读取数据之前，会缓存所有压入的数据
rs.push('Stream ');
rs.push('Readable ');
rs.push('Push() ');
rs.push('Pipe() ');
rs.push('\n');

// 通知接收方数据发送完毕
rs.push(null);

// 导出数据
rs.pipe(process.stdout);
