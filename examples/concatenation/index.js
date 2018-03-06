const fs = require('fs');
const async = require('async');
process.chdir('examples/concatenation/recipes');

let str = '';
const dirs = fs.readdirSync('.');

async.filter(dirs, isFile, function(err, filenames) {
  async.eachOfSeries(filenames, readAndConcat, onComplete);
});

function isFile(filename, callback) {
  fs.stat(filename, (err, stats) => {
    if (err) callback(err);
    console.log('fs.stat', new Date().getTime());
    callback(null, stats.isFile());
  });
}

function readAndConcat(filename, key, callback) {
  // 模拟IO操作时间，用来验证eachSeries是按顺序串行执行readAndConcat方法
  setTimeout(() => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) callback(err);
      str += data;
      console.log('fs.readFile', new Date().getTime());
      // if (key > 1) {
      //   callback('test error');
      // }
      callback(null, str);
    });
  }, 1000);
}

function onComplete(err) {
  if (err) throw err;
  console.log(str);
}
