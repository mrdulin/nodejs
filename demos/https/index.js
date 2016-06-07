const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};
const port = 3000;
const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
}).listen(port, () => {
    process.stdout.write(`Server is listen on port ${port}`);
});
