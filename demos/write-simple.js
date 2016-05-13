'use strict';

const fs = require('fs');

fs.writeFile('target.txt', 'This is writed by node', function (err) {
    if (err) throw err;
    console.log('file saved');
});