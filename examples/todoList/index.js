const http = require('http');

const model = require('./model');
const controller = require('./controller');

const port = 3000;

model.read().then(data => {
  console.log('server data: ', data);
  const server = http.createServer((req, res) => {
    switch (req.url) {
      case '/':
        switch (req.method) {
          case 'GET':
            controller.render(res, data);
            break;
          case 'POST':
            controller.add(req, res, data);
            break;
          default:
            controller.badRequest(res);
        }
        break;
      case '/delete':
        controller.del(req, res);
        break;
      default:
        controller.notFound(res);
        break;
    }
  });

  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
