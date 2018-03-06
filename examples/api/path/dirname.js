const path = require('path');

// 获取文件所在文件夹路径

const path_resolve = path.resolve('test', 'test.txt');
console.log('path_resolve: ', path_resolve);

// 在使用path.dirname()方法执行获取文件夹路径的操作时，参数必须为字符串绝对路径
console.log("the file test.txt's dirname is: ", path.dirname(path_resolve));
