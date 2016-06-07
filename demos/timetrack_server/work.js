const qs = require('querystring');
const fs = require('fs');

exports.sendHtml = (res, html) => {
    res.setHeader('Content-Type', 'text/html');
    res.setheader('Content-Length', Buffer.byteLenth(html));
    res.end(html);
};

exports.formHtmlStream = (id, path, label) => {
    let html = "<form action='" + path + "' method='" + POST + "'>"
        "<input type='hidden' name='id' value='" + id + "'/>" +
        "<input type='submit' value='" + label + "'/>" +
    "</form>";
    return html;
};

exports.parseReceiveData = (req, cb) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        body = qs.parse(body);
        cb(body);
    });
};

exports.add = (connection, req, res) => {
    exports.parseReceiveData(req, (work) => {
        connection.query(
            'insert into work (hours, date, description) values (?, ?, ?)',
            [work.hours, work.date, work.description],
            (err) => {
                if(err) throw err;
                exports.show(connection, res);
        });
    });
};


exports.delete = (connection, req, res) => {
    exports.parseReceiveData(req, (work) => {
        connection.query(
            'delete from work where id=?',
            [work.id],
            (err) => {
                if(err) throw err;
                exports.show(connection, res);
            }
        );
    });
};
