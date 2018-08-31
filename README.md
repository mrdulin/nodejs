# node examples

## 环境

`node`: `v8.4.0`
`npm`: `3.10.10`

## 其他说明

- `connect`不再包含`connect.bodyParser`，`connect.cookieParser`中间件，需要单独安装，如`npm i body-parser --save`

- 使用`postman`或者`curl`测试

- 调试使用`node-inspector`和`nodemon`，在一个终端窗口中`nodemon --debug app.js`，再打开一个窗口`node-inspector`

- `querystring`模块无法正确`stringify`嵌套对象，使用第三方`qs`模块
