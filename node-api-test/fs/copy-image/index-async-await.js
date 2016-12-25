// require("babel-polyfill");

const fs = require('fs');

const read = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./cup.jpg', 'base64', (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    })
};

const write = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./cup-cp.jpg', data, 'base64', err => {
            if(err) reject(err);
            resolve('写入数据成功');
        })
    })
}

async function main (){
    const data = await read();
    return await write(data);
}


main().then(console.log).catch(e => console.log(e.stack));
