const fs = require('fs');
const async = require('async');
const isFile = require('./isFile');

process.chdir('examples/concatenation/recipes');

let str = '';
const dirs = fs.readdirSync('.');

function readAndConcat(filename, key, callback) {
  // 模拟IO操作时间，用来验证eachSeries是按顺序串行执行readAndConcat方法
  setTimeout(() => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) callback(err);
      str += data;
      console.log('fs.readFile', new Date().getTime());
      callback(null, str);
    });
  }, 1000);
}

function onComplete(err) {
  if (err) throw err;
  console.log(str);
}

async.filter(dirs, isFile, (err, filenames) => {
  async.eachOfSeries(filenames, readAndConcat, onComplete);
});
