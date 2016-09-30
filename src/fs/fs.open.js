var fs = require('fs'),
    path = require('path');

var p = path.normalize('./fs.rename.js');

fs.stat(p, function (err, stats) {
    if (err) throw err;
    console.log(stats);
    if (stats.isFile()) {
        console.log('This is a file');
    }
    if (stats.isDirectory()) {
        console.log('This is a directory');
    }
});

fs.open(p, 'r', function opened(err, fd) {
    if (err) throw err;
    var readBuffer = new Buffer(1024),
        bufferOffset = 0,
        bufferLength = readBuffer.length,
        filePosition = 0;
    fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, function (err, bytesRead, buffer) {
        if (err) throw err;
        console.log('Just read ' + bytesRead + 'bytes');
        if (bytesRead > 0) {
            console.log(readBuffer.slice(0, bytesRead).toString('utf8', 0, bytesRead));
        }
    });
});


