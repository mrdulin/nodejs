import http from 'http';
import https from 'https';
import SocketIO, { Socket } from 'socket.io';
import fs from 'fs';
import path from 'path';
import { createLogger } from 'dl-toolkits';
const logger = createLogger();

const port: number = 3001;

const server: https.Server = https.createServer(
  {
    cert: fs.readFileSync(path.resolve(__dirname, '../../../ssl/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../../../ssl/key.pem')),
  },
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    logger.info(`request.url: ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
      filePath = path.resolve(__dirname, './index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error: NodeJS.ErrnoException, content: Buffer) => {
      if (error) {
        res.writeHead(500);
        return res.end(error.message);
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  },
);

const io: SocketIO.Server = SocketIO(server);

io.on('connection', (socket: Socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('updateTemplate', (data) => {
    logger.info(data);
    socket.emit('updateTemplate', { random: data });
  });
});

server.listen(port, () => {
  logger.info(`Https server is listening on https://localhost:${port}`);
});
