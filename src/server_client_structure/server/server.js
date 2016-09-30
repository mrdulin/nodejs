var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

var server = http.createServer(requestListener);
var clientRelativeDir = '../client';

function requestListener(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);

    if (pathname == '/') pathname = '/index.html';

    var extname = path.extname(pathname);
    var contentType = getContentType(extname);
    var dir = path.resolve(clientRelativeDir + pathname);

    console.log(dir)
    fs.readFile(dir, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    res.writeHead(404, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

    if (pathname === '/books') {
    	var bookList = [
    		{
    			name: 'angular',
    			id: 1
    		},
    		{
    			name: 'jquery',
    			id: 2
    		},
    		{
    			name: 'backbone',
    			id: 3
    		}
    	];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(bookList));
    } else if (pathname === '/user') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ name: 'novaline', age: 23 }));
    }
}


function getContentType(extname) {
	var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    return contentType;
}

server.listen(3000);
