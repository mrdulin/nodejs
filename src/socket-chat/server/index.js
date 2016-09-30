/**
 * Created by dulin on 16/8/18.
 */

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

io.on('connection', () => {
    process.stdout.write('a user connected');
});

app.listen(port, () => {
    process.stdout.write(`Chat server listen on port ${port}`);
});
