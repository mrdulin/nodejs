const http = require('http');

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

    const itemTpl = items.map((item) => {
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

};

const badRequest = (res) => {

};

const NotFound = (res) => {

};
