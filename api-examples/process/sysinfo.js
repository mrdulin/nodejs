// 获取系统相关信息

console.log('当前进程id: ', process.pid);
console.log('当前进程名称: ', process.title);

console.log('Node.js版本号: ', process.version);
console.log('Node.js版本属性： ', process.versions);

console.log('Node.js配置选项: ', process.config);

console.log('运行当前进程可执行文件的绝对路径：', process.execPath);

console.log('当前进程的命令行参数数组: ', process.argv);

console.log('当前系统平台：', process.platform);

console.log('当前CPU架构：', process.arch);

//可以找到很多非常有用的shell环境变量，PATH(系统环境路径)、JRE_HOME(jre环境路径)、PWD(用户路径)、LANGUAGE(语言版本)、LANG（编码版本）、SHELL(shell环境路径)
console.log('指向当前shell的环境变量：', process.env);
