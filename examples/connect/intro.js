const connect = require('connect');
const app = connect();

const logger = (req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
};

const hello = (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world');
};

const restrict = (req, res, next) => {
  console.log('restrict');
  next(new Error('restrict fail'));
};

const admin = (req, res, next) => {
  console.log('admin');
  next();
};

const errorHandler = () => {
  const env = process.env.NODE_ENV || 'development';

  console.log('env', env);

  return (err, req, res, next) => {
    res.statusCode = 500;
    switch (env) {
      case 'development':
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ msg: err.message }));
        break;
      default:
        res.end('Server error');
    }
  };
};

app
  .use(logger)
  .use('/admin', restrict)
  .use('/admin', admin)
  .use(hello)
  .use(errorHandler());

app.listen(3000);
