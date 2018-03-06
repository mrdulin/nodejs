// 改变应用程序目录
console.log('Current directory: ', process.cwd());
console.log('Change directory to: /Users/elsa');

process.chdir('/Users/elsa');

console.log('Current directory: ', process.cwd());
