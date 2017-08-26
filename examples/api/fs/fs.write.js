var fs = require('fs'),
    path = require('path');

var p = path.normalize('./renameTest.txt');

fs.open(p, 'a', function opened(err, fd) {
    if (err) throw err;
    var buffer = new Buffer('I want to fuck nodejs\n', 'utf8'),
        bufferOffset = 0,
        bufferLength = buffer.length,
        filePosition = 0;
    fs.write(fd, buffer, bufferOffset, bufferLength, filePosition,
        function wrote(err, bytes, buf) {
            if (err) throw err;
            console.log('wrote ' + bytes + 'bytes');
            console.log(buffer.toString('utf8'));

            fs.fsyncSync(fd);
            fs.closeSync(fd);
        });
});
