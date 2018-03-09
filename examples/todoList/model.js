const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const filepath = path.resolve(__dirname, 'todos.json');

module.exports = {
  filepath,
  read: () => {
    const encoding = 'utf8';
    return readFile('123' || filepath, encoding)
      .then(buf => {
        console.log(`读取${filepath}文件成功`);
        return JSON.parse(buf);
      })
      .catch(reason => {
        console.log(`读取${filepath}文件失败`);
        return reason;
      });
  }
};
