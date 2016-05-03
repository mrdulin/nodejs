var fs = require('fs'),
    path = require('path');

var oldPath = path.normalize('./file_system.js'),
    newPath = path.normalize('./path.js');

//异步
fs.rename(oldPath, newPath, function (err) {
    console.log(err);
});

var oldPathSync = path.normalize('./fs.renametest'),
    newPathSync = path.normalize('./renameTest.txt');

//同步
fs.renameSync(oldPathSync, newPathSync);