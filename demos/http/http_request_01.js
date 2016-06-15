const http = require('http');
const util = require('util');
const querystring = require('querystring');

const port = 8080;
const requestBook = () => {
    const params = querystring.stringify({
        q: '计算机',
        count: 1
    })
    const options = {
        protocol: 'http:',
        host: 'api.douban.com',
        method: 'GET',
        path: '/v2/book/search?'+ params
    };

    const req = http.request(options, (res) => {
        let data;
        console.log(`status: ${res.statusCode}\n`);
        console.log(`headers: ${util.inspect(res.headers)}\n`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`body: ${util.inspect(JSON.parse(data), {depth: null})}\n`);
            // console.log('body: %j', JSON.parse(data));
        });
    })

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}\n`);
    });

    req.end();
};

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method.toLowerCase();

    switch (method) {
        case 'get':
            if(url === '/') {
                const html = `
                    <html>
                        <header>
                            <title>Search book</title>
                        </header>
                        <body>
                            <form action="/search" method="post">
                                <label>
                                    <input type="search" name="bookname" placeholder="输入书名搜索"/>
                                </label>
                                <input type="submit" value="搜索"/>
                            </form>
                        </body>
                    </html>
                `;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(html);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('404,找不到页面～');
            }
            break;
        case 'post':
            if('/search' === url) {
                //这里如果声明let body;则最后body += chunk结果是undefined
                let body = '';
                req.setEncoding('utf8');
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    body = querystring.parse(body);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    console.log(body);
                    res.end(`adsfadfasfdfasd${body.bookname}`);
                });

            } else {

            }
            break;
    }

});

server.listen(port, () => {
    console.log(`Server is listen on port: ${port}`)
});
