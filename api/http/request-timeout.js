const http = require('http');
const options = {
    hostname: 'www.youtube.com',
    port: 80,
    path: '/',
    method: 'GET'
}

console.log('开始连接目标地址.')

let timeId;
const request = http.request(options);

request.on('response', res => {
    clearInterval(timeId);
    console.log('状态码： %s', res.statusCode);
    console.log('响应头： %s', JSON.stringify(res.headers, null, 4));
    res.setEncoding('utf8');
    res.on('data', chunk => {
        console.log('响应内容：%s', chunk);
    })
}).on('error', err => {
    clearInterval(timeId);
    if(err.code === 'ECONNRESET') {
        console.log("socket 端口超时");
    } else {
        console.error(err.stack);
    }
    /**
     * Error: getaddrinfo ENOTFOUND www.aaa.com www.aaa.com:80
    at errnoException (dns.js:28:10)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:76:26)
     */
})

request.on('socket', socket => {
    socket.setTimeout(5000);
    let second = 0;
    timeId = setInterval(() => {
        second = second + 1000;
        console.log('连接中... %ss', second / 1000)
    }, 1000)
    socket.on('timeout', () => {
        clearInterval(timeId)
        request.abort();
    })
})

request.end();
