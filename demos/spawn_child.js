var child_process = require('child_process'),
    path = require('path');

var spawn = child_process.spawn;
child = spawn('tail', ['-f', './renameTest.txt']);

child.stdout.on('data', function (data) {
    console.log('tail output: ' + data);
});

child.stderr.on('data', function (data) {
    console.log('tail error output: ' + data);
});