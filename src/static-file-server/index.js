const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const staticPath = path.join(__dirname, 'public');
const port = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const writeStream = fs.createWriteStream('request.txt');
  req.pipe(writeStream);

  const filepath = path.join(staticPath, reqUrl.pathname);

  // const readable = fs.createReadStream(filepath);
  // 向客户端发送文件
  // 方法1
  // readable.on('data', (chunk) => {
  //     res.write(chunk);
  // });
  //
  // readable.on('end', () => {
  //     res.end();
  // });
  //
  // readable.on('error', (err) => {
  //     console.log(err);
  //     //'ENOENT'是'Error NO ENTry'的缩写，表示‘没有条目(文件或目录)错误’
  //     if(err.code === 'ENOENT') {
  //         res.statusCode = 404;
  //         res.end('Not Found');
  //     } else {
  //         res.statusCode = 500;
  //         res.end('Internal Server Error');
  //     }
  // });

  // 方法2
  // readable.pipe(res);
  // readable.on('error', (err) => {
  //     res.statusCode = 500;
  //     res.end('Internal Server Error');
  // });

  // 完整的带错误处理的写法
  fs.stat(filepath, (err, stat) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    } else {
      res.setHeader('Content-Length', stat.size);
      const readable = fs.createReadStream(filepath);
      readable.pipe(res);
      readable.on('error', () => {
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }
  });
});

server.listen(port, () => {
  console.log('server is listen on port ', port);
});
