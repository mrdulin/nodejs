var fs = require('fs'),
    path = require('path');

var p = path.normalize('./renameTest.txt');

function openFileToWriteAndClose(buf, callback) {
    fs.open(p, 'a', function opened(openErr, fd) {
        console.log('open file');
        if (openErr) {
            callback(openErr);
        }
        var bufferOffset = 0,
            filePosition = 0,
            bufferLength = buf.length;
        fs.write(fd, buf, bufferOffset, bufferLength, filePosition, function wrote(writeErr, written, buff) {
            console.log('write file');
            if (writeErr) {
                writeErrFn(writeErr);
            }
            fs.close(fd, function (closeErr) {
                console.log('close file');
                callback(closeErr);
            });
        });

        function writeErrFn(error) {
            fs.close(fd, function () {
                console.log('close file');
                callback(error);
            })
        }
    });
}

openFileToWriteAndClose(
    new Buffer('\nI really want to fuck NodeJs\n', 'utf8'),
    function (err) {
        if (err) throw err;
        console.log('write and close the file success');
    }
);


exports.openFileToWriteAndClose = openFileToWriteAndClose;