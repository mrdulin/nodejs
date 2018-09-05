# wss

## Usage

使用`http-server`启动`https`服务器，以便在浏览器中访问我们的前端页面`index.html`

```bash
nodejs [master] ⚡  $(npm bin)/http-server ./src/websocket-secure-connection/ws/ -o -c-1 -S -C ./ssl/cert.pem -K ./ssl/key.pem -p 3000
```

使用`ws`模块和`https`模块启动`https`服务器和`wss`服务器

```bash
☁  nodejs [master] ⚡  $(npm bin)/ts-node src/websocket-secure-connection/ws/index.ts
```
