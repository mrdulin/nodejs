var net = require('net');

var chatServe = net.createServer(),
    clientList = [];

chatServe.on('connection', function (client) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write('Hi! ' + client.name + '\n');
    console.log(client.name + ' joined');

    clientList.push(client);

    client.on('data', function (data) {
        broadcast(data, client);
    });

    client.on('end', function () {
        console.log(client.name + ' quit');
        clientList.splice(clientList.indexOf(client), 1);
    });

    client.on('error', function (e) {
        console.log(e);
    });
    // client.end();
});

function broadcast(message, client) {
    var cleanup = [];
    for (var i = 0; i < clientList.length; i++) {
        if (client !== clientList[i]) {
            if (clientList[i].writable) {
                clientList[i].write(client.name + "say:" + message);
            } else {
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
        }
    }

    for (i = 0; i < cleanup.length; i++) {
        clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

chatServe.listen(9000);
console.log('chat serve start');