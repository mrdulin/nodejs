'use strict';
const fs = require('fs');

fs.watch('target.txt', function (e, filename) {
    console.log('file target.txt changed');
    if (filename) {
        console.log('filename is : ', filename);
    } else {
        console.log('filename arg is not support');
    }
});
console.log('Now watching the target.txt for changes...');