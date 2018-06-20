const connect = require('connect');

const mw_hello = (req, res, next) => {
  if (req.url.match(/^\/hello/)) {
    res.statusCode = 200;
    res.end('Hello world.\n');
  } else {
    next();
  }
};

const db = {
  users: [{ name: 'tobi' }, { name: 'loki' }, { name: 'jane' }]
};

const mw_users = (req, res, next) => {
  const match = req.url.match(/^\/user\/(.+)/);
  if (match) {
    const user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      let err = new Error('User not Found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
};

const mw_pets = (req, res, next) => {
  if (req.url.match(/^\/pet\/(.+)/)) {
    foo();
  } else {
    next();
  }
};

const mw_errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ err: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ err: 'Internal Server Error' }));
  }
};

const mw_errorPage = () => {};

const api = connect()
  .use(mw_users)
  .use(mw_pets)
  .use(mw_errorHandler);

const app = connect()
  .use(mw_hello)
  .use('/api', api)
  .use(mw_errorPage)
  .listen(3000);
