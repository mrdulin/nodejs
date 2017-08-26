const fs = require('fs');

const read = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./cup.jpg', 'base64', (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

const write = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./cup-cp.jpg', data, 'base64', err => {
            if(err) reject(err);
            resolve('写入数据成功');
        })
    })
}

const main = function* () {
    const data = yield read();
    return yield write(data);
}

const mainGen = main();

mainGen.next().value.then(data => {
    return mainGen.next(data).value.then(console.log);
}).catch(e => console.log(e.stack));
