const http = require('http');
const qs = require('querystring');

const port = 3000;
let items = [];

const server = http.createServer((req, res) => {
    if('/' === req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        NotFound(res);
    }
});

server.listen(port, () => {
    console.log('server is listen on port ', port);
});

const show = (res) => {
    //这里不能用const定义itemTpl
    let itemTpl = items.map((item) => {
        return '<li>'+ item + '</li>';
    }).join('');
    let html = "<html>" +
            "<head>" +
                "<title>TodoList</title>" +
            "</head>" +
            "<body>" +
                "<h1>Todo List</h1>" +
                "<ul>" +
                     itemTpl +
                "</ul>" +
                "<form action='/' method='post'>" +
                    "<div>" +
                        "<label>" +
                            "<input type='text' name='item'/>" +
                        "</label>" +
                    "</div>" +
                    "<div>" +
                        "<input type='submit' value='add item'>" +
                    "</div>" +
                "</form>" +
            "</body>" +
        "</html>";

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

const add = (req, res) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log('body', body)
        let obj = qs.parse(body);
        console.log('obj',obj);
        items.push(obj.item);
        show(res);
    })
};

const badRequest = (res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
};

const NotFound = (res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
};
