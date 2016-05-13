'use strict';

var
    net = require('net'),
    fs = require('fs'),
    filename = process.argv[2],
    server = net.createServer(function (connection) {

        console.log('Subscriber connected.');
        connection.write('Now watching ' + filename + 'for changes...\n');

        var watcher = fs.watch(filename, function (e, fname) {
            connection.write('File ' + filename + 'changed. ' + new Date().toLocaleDateString() + '\n');
        });

        connection.on('close', function () {
            console.log('Subscriber disconnected.');
            watcher.close();
        });
    });

if (!filename) {
    throw Error('No target filename was specified.')
}

server.listen(5432, function () {
    console.log('Listening for subscribers...');
});