const qs = require('querystring');
const fs = require('fs');

exports.sendHtml = (res, html) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

exports.actionHtml = (id, action, label) => {
    let html = "<form action='" + action + "' method='POST'>"
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


exports.archive = (connection, req, res) => {
    exports.parseReceiveData(req, (work) => {
        connection.query(
            'update work set archived=1 where id=?',
            [work.id],
            (err) => {
                if(err) throw err;
                exports.show(connection, res);
            }
        )
    });
};

exports.show = (connection, res, showArchived) => {
    let archiveValue = showArchived ? 1 : 0;
    connection.query(
        'select * from work where archived=? order by date desc',
        [archiveValue],
        (err, rows) => {
            if(err) throw err;
            let html = showArchived
            ? ''
            : '<a href="/archived">Archived Work</a><br/>';

            html += exports.workHitListHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        }
    );
};

exports.showArchived = (connection, res) => {
    exports.show(connection, res, true);
};


exports.workHitListHtml = (rows) => {
    let rowHtml = '';
    const rowLen = rows.length;
    for(let i = 0; i < rowLen; i++) {

    }
    let html = '<table>'+
        '<thead>'+
            '<tr>'
                '<th>Date</th>' +
                '<th>Hours</th>' +
                '<th>Description</th>' +
            '</tr>' +
        '</thead>' +
        '<tbody>'+
            rows
        '</tbody>'+
    '</table>';

    return html;
};

exports.workFormHtml = () => {
    let html = '<form method="POST" action="/">'+
        '<div>Date (YYYY-MM-DD): <input type="text" name="date"/></div>' +
        '<div>Hours: <input type="text" name="hours"/></div>' +
        '<div>Description: <textarea name="description"></textarea></div>' +
        '<div><input type="submit" value="add work"/></div>' +
    '</form>';

    return html;
};
