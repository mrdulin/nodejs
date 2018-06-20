const fs = require('fs');

// process.stdout是一个可写（Writable）流
// fs.createReadStream(process.argv[2])创建的可读流数据会被写入process.stdout

// pipe方法会自动调用可读流的data与end事件
fs.createReadStream(process.argv[2]).pipe(process.stdout);
