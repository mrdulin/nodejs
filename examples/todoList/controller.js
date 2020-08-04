const qs = require('querystring');

const model = require('./model');
const view = require('./view');

const encoding = 'utf8';

function render(res, data) {
  const appView = view.appView(data);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(appView));
  res.end(appView);
}

function renderList(res, data) {
  const listView = view.listView(data);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(listView));
  res.end(listView);
}

function add(req, res, data) {
  let body = '';
  req.setEncoding(encoding);
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    const json = qs.parse(body);
    const todo = { id: data.items.length + 1, name: json.item };
    data.items.push(todo);
    model.save(data).then(() => {
      render(res, data);
    });
  });
}

function del(req, res) {
  let body = '';
  req
    .setEncoding('utf8')
    .on('data', chunk => {
      body += chunk;
    })
    .on('end', () => {
      const { id } = qs.parse(body);
      model
        .del(id)
        .then(datas => {
          renderList(res, datas);
        })
        .catch(console.error);
    });
}

const badRequest = res => {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bad Request');
};

const notFound = res => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
};

module.exports = {
  render,
  add,
  del,
  badRequest,
  notFound
};
