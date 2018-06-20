const fs = require('fs');

// 使用可写（writable）流写文件
const filepath = 'test.txt';

const ws = fs.createWriteStream(filepath);

ws.write('stream - ');
ws.write('writable - ');
ws.write('file - ');

setTimeout(() => {
  ws.end('end.\n');
}, 1000);
