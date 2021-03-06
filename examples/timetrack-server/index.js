const http = require('http');
const mysql = require('mysql');
const work = require('./work');
const port = 3000;
const host = '127.0.0.1';

const connection = mysql.createConnection({
  host: host,
  user: 'root',
  password: '',
  database: 'timetrack',
  dateStrings: 'date'
});

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      switch (req.url) {
        case '/':
          work.add(connection, req, res);
          break;
        case '/archive':
          work.archive(connection, req, res);
          break;
        case '/delete':
          work.delete(connection, req, res);
          break;
      }
      break;
    case 'GET':
      switch (req.url) {
        case '/':
          work.show(connection, res);
          break;
        case '/archived':
          work.showArchived(connection, res);
          break;
      }
      break;
  }
});

connection.query(
  'CREATE TABLE IF NOT EXISTS work (' +
    'id INT(10) NOT NULL AUTO_INCREMENT,' +
    'hours DECIMAL(5, 2) DEFAULT 0,' +
    'date DATE,' +
    'archived INT(1) DEFAULT 0,' +
    'description LONGTEXT,' +
    'PRIMARY KEY(id)' +
    ')',
  err => {
    if (err) throw err;
    server.listen(port, host, () => {
      process.stdout.write(`Server is listening on ${host}:${port}`);
    });
  }
);
