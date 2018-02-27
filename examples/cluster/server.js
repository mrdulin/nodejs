const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();

const DEV = 'development';

app.set('port', process.env.PORT || 3000);
app.set('env', DEV || process.env.NODE_ENV);

app.use(function(req, res, next) {
  var cluster = require('cluster');
  if (cluster.isWorker) console.log('Worker %d received request', cluster.worker.id);
  next();
});

switch (app.get('env')) {
  case 'development':
    app.use(require('morgan')('dev'));
    break;
  case 'production':
    const logDirectory = path.join(__dirname, 'log');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    app.use(morgan('combined', { stream: accessLogStream }));
    break;
}

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

function startServer() {
  http.createServer(app).listen(app.get('port'), function() {
    console.log(
      'Express started in ' +
        app.get('env') +
        ' mode on http://localhost:' +
        app.get('port') +
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
