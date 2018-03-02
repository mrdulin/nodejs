const express = require('express');
const app = express();
const port = 2223;

app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>

  <body>
    <h1>XSS攻击实例</h1>
    <ul>
      <li>
        <a href="/about?param=<script>alert(/xss/)</script>">通过url查询参数注入脚本</a>
      </li>
    </ul>
  </body>

  </html>`;
  res.send(html);
});

app.get('/about', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>

  <body>
    <h1>通过url查询字符串注入脚本</h1>
    ${req.query.param}
  </body>

  </html>`;
  res.set({
    'X-XSS-Protection': 0
  });
  res.send(html);
});

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}`);
});
