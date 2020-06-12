const http = require('http');

const port = 3000;
const server = http.createServer((req, res) => {
  let url = 'http://www.google.com';
  let body = `<p>Redirecting to <a href=${url}>google</a></p>`;
  //设置response header的Location属性，重定向到指定的url
  res.setHeader('Location', url);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.statusCode = 302;
  res.end(body);
});

server.listen(port, () => {
  console.log('server is on port', port);
});
