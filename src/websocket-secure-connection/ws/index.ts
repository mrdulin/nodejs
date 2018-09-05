import WebSocket from 'ws';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

import { logger } from '../../utils';

const server: https.Server = https.createServer(
  {
    cert: fs.readFileSync(path.resolve(__dirname, '../../../ssl/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../../../ssl/key.pem'))
  },
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.end('normal');
  }
);

const wss: WebSocket.Server = new WebSocket.Server({ server });
const port: number = 3001;

wss.on('connection', function connection(socket: WebSocket) {
  socket.on('message', function message(data: WebSocket.Data) {
    logger.info({ msg: data });
    socket.send(JSON.stringify({ random: data }));
  });
});

server.listen(port, function listening() {
  logger.info(`Https server is listening on https://localhost:${port}`);
  // If the `rejectUnauthorized` option is not `false`, the server certificate
  // is verified against a list of well-known CAs. An 'error' event is emitted
  // if verification fails.
  //
  // The certificate used in this example is self-signed so `rejectUnauthorized`
  // is set to `false`.
  const address: string = `wss://localhost:${server.address().port}`;
  const ws: WebSocket = new WebSocket(address, { rejectUnauthorized: false });

  ws.on('open', function open() {
    logger.info(`Websocket server is listening on wss://localhost:${server.address().port}`);
    ws.send('WebSockets opened');
  });
});
