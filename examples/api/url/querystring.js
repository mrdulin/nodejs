const url = require('url');
const querystring = require('querystring');

// 解析url参数

const realUrl = 'http://location:6666/index?name=king&gender=male&level=high';
const urlParsed = url.parse(realUrl);

const query = querystring.parse(urlParsed.query);

console.log('query: ', query);
