const path = require('path');

// 获取路径中文件扩展名

const path_resolve = path.resolve('test', 'test.txt');
console.log('path_resolve: ', path_resolve);

// path.extname()的参数必须为字符串绝对路径
console.log(path.extname(path_resolve));
