const http = require('http');
const fs = require('fs');
const path = require('path');

const SERVER_PORT = 2222;

const server = http.createServer(requestListener);
const STATIC_DIR = '../client';

function getFile(filepath) {
  filepath = './' + filepath;
  filepath = path.resolve(__dirname, STATIC_DIR, filepath);

  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') {
          reject({ error, code: 404 });
        } else {
          reject({ error, code: 500 });
        }
      } else {
        resolve(content);
      }
    });
  });
}

function requestListener(req, res) {
  let url = req.url;
  url = url === '/' ? '/index.html' : url;

  var extname = path.extname(url);
  var contentType = getContentType(extname);

  if (contentType) {
    getFile(url).then(file => {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(file, 'utf-8');
    }).catch(e => {
      console.log(e.error.stack);
      res.writeHead(e.code);
      res.end();
    });
  } else {
    apiRouter(req, res);
  }
}

function apiRouter(req, res) {
  const {url} = req;
  let data;
  if (url === '/books') {
    data = [
      { name: 'angular', id: 1 },
      { name: 'jquery', id: 2 },
      { name: 'backbone', id: 3 }
    ];
  } else if (url === '/user') {
    data = { name: 'novaline', age: 23 };
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}


function getContentType(extname) {
  let contentType = '';
  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  return contentType;
}

server.listen(SERVER_PORT, () => {
  console.log(`server is listening on port ${SERVER_PORT}`);
});
