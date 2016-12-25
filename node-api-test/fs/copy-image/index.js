const fs = require('fs');

fs.readFile('./cup.jpg', 'base64', (err, data) => {
    if(err) throw err;
    console.log(typeof data);

    fs.writeFile('./cup-cp.jpg', data, 'base64', (err) => {
        if(err) return console.error('写文件操作失败。');
        console.log('写文件操作成功');
    })
})
