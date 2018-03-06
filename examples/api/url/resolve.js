const url = require('url');

// url路径转化, 所谓路径转化就是在原有url路径的基础上进行增加或替换的操作

console.log(url.resolve('/one/two/three', 'four'));
console.log(url.resolve('/one/two/three/', 'four'));
console.log(url.resolve('/one/two/three', '/four'));
console.log(url.resolve('/one/two/three/', '/four'));

const domain = 'http://www.example.com';
console.log(url.resolve(`${domain}/one`, 'two'));
console.log(url.resolve(`${domain}/one`, '/two'));
console.log(url.resolve(`${domain}/one/`, 'two'));
console.log(url.resolve(`${domain}/one/`, '/two'));
