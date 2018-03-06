const url = require('url');
const querystring = require('querystring');

// 解析url参数

// 1.
const realUrl = 'http://location:6666/index?name=king&gender=male&level=high';
const urlParsed = url.parse(realUrl);

const query = querystring.parse(urlParsed.query);

console.log('query: ', query);

// 2.
const nestedObj = {
  foo: {
    bar: {
      baz: 'fk'
    }
  }
};

const otherNestedObj = {
  foo: {
    bar: 'fk'
  }
};

const simpleObj = {
  foo: 'bar'
};

console.log('nested object: ' + querystring.stringify(nestedObj));
console.log('other nested object: ' + querystring.stringify(otherNestedObj));
console.log('simple object: ' + querystring.stringify(simpleObj));
