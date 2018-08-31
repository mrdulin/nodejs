const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'localhost',
  port: 3000,
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: fs.readFileSync('../ca/ca.crt')
};

options.agent = new https.Agent(options);

const req = https.request(options, res => {
  res.setEncoding('utf-8');
  res.on('data', d => {
    console.log(d);
  });
});

req.end();

req.on('error', err => {
  console.log(err);
});
