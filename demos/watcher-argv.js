/**
 * Created by dul on 2016/4/2.
 */
const
    fs = require('fs'),
    filename = process.argv[2];

if (!filename) {
    throw Error('A file to watch must be specified!');
}

fs.watch(filename, function () {
    console.log('file target.txt changed');
});
console.log('Now watching the target.txt for changes...');