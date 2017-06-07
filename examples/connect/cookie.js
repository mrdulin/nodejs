const connect = require('connect');
const cookieParser = require('cookie-parser');

// const app = connect()
//     .use(cookieParser('cookie key'))
//     .use((req, res) => {
//         console.log(req.cookies);
//         console.log(req.signedCookies);
//         res.end('hello\n');
//     })
//     .listen(3000);

const app = connect()
    .use((req, res) => {
        res.setHeader('Set-Cookie', 'name=novaline');
        res.setHeader('Set-Cookie', 'age=12;max-age=10;')
        res.end();
    }).listen(3000);
