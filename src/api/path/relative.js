const path = require('path');

//解析相对路径

const path_resolve_a = path.resolve('test', 'text.txt');
const path_resolve_b = path.resolve('test-b.txt');

console.log('path_resolve_a: ', path_resolve_a);
console.log('path_resolve_b: ', path_resolve_b);

// test-b.txt相对于test.txt的起源路径
// 提示：在使用path.relative()方法执行解析相对路径的操作时，两个参数必须为字符串绝对路径
console.log('the relative path is: ', path.relative(path_resolve_a, path_resolve_b));
