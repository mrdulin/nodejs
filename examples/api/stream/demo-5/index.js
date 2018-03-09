const fs = require('fs');

const src = 'src.txt';
const dest = 'dest.txt';
const rs = fs.createReadStream(src);
const ws = fs.createWriteStream(dest);

// 清空dest.txt文件内容
fs.truncateSync(dest, 0);

// 使用pipe复制文件
rs.pipe(ws);

// 等价于
rs.on('data', chunk => {
  ws.write(chunk);
});

rs.on('end', () => {
  ws.end();
});

ws.on('finish', () => {
  console.log('文件复制完毕');
});
