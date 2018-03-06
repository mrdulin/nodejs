const url = require('url');

// 解析和格式化url

const realUrl = 'http://location:6666/index?name=king&gender=male&level=high';
const urlParsed = url.parse(realUrl);

console.log('urlParsed: ', urlParsed);

const urlFormatted = url.format(urlParsed);
console.log('urlFormatted: ', urlFormatted);
