import WebSocket from 'ws';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

import { logger } from '../../../utils';

const server: https.Server = https.createServer(
  {
    cert: fs.readFileSync(path.resolve(__dirname, '../../../../ssl/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../../../../ssl/key.pem'))
  },
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const indexPage: string = path.resolve(__dirname, './index.html');
    fs.readFile(indexPage, (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
  }
);

const wss: WebSocket.Server = new WebSocket.Server({ server });
const port: number = 3000;

wss.on('connection', function connection(socket: WebSocket) {
  socket.on('message', function message(data: WebSocket.Data) {
    logger.info({ msg: data });
    socket.send(JSON.stringify({ random: data }));
  });
});

server.listen(port, function listening() {
  logger.info(`Https server is listening on https://localhost:${port}`);
  const address: string = `wss://localhost:${server.address().port}`;
  const ws: WebSocket = new WebSocket(address, { rejectUnauthorized: false });

  ws.on('open', function open() {
    logger.info(`Websocket server is listening on wss://localhost:${server.address().port}`);
    ws.send('WebSockets opened');
  });
});
