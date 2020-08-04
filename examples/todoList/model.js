const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const filepath = path.resolve(__dirname, 'todos.json');
const encoding = 'utf8';

function read() {
  return readFile(filepath, encoding)
    .then(buf => {
      console.log(`读取${filepath}文件成功\n`);
      return JSON.parse(buf);
    })
    .catch(reason => {
      console.log(`读取${filepath}文件失败\n`);
      console.error(reason);
      return reason;
    });
}

function save(datas) {
  const jsonString = JSON.stringify(datas, null, 4);
  return writeFile(filepath, jsonString, encoding)
    .then(() => {
      console.log('保存成功\n');
      return datas;
    })
    .catch(err => {
      console.log('保存失败\n');
      console.error(err);
    });
}

function del(id) {
  const idNum = Number.parseInt(id, 10);
  return read()
    .then(data => {
      const { length: len } = data.items;
      if (!len) return Promise.reject(new Error('没有数据'));
      for (let i = 0; i < len; i += 1) {
        if (Number.parseInt(data.items[i].id, 10) === idNum) {
          data.items.splice(i, 1);
          break;
        }
      }
      return Promise.resolve(data);
    })
    .then(save);
}

module.exports = {
  filepath,
  read,
  save,
  del
};
