const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cluster = require('cluster');
const path = require('path');
const rfs = require('rotating-file-stream');
const fs = require('fs');

const app = express();
const DEV = 'development';
const logDirectory = path.join(__dirname, 'log');
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

app.set('port', process.env.PORT || 3000);
app.set('env', DEV || process.env.NODE_ENV);

app.use((req, res, next) => {
  if (cluster.isWorker) console.log('Worker %d received request', cluster.worker.id);
  next();
});

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;
  case 'production':
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    app.use(morgan('combined', { stream: accessLogStream }));
    break;
  default:
    break;
}

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

function startServer() {
  http.createServer(app).listen(app.get('port'), () => {
    console.log(
      'Express started in ',
      app.get('env'),
      ' mode on http://localhost:',
      app.get('port'),
      '; press Ctrl + C to terminate.'
    );
  });
  return app;
}

// console.log('require.main: ', require.main);
if (require.main === module) {
  startServer();
} else {
  module.exports = startServer;
}
