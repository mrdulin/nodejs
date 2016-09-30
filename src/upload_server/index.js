const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    switch (req.method) {
        case 'GET':
            show(res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
});

server.listen(port, () => {
    process.stdout.write('Server is listen on port', port);
});

const show = (res) => {
    const readable = fs.createReadStream('./index.html');
    readable.pipe(res);
    readable.on('error', () => {
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
};
