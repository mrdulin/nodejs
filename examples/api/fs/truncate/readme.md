# 修改文件内容长度

四个方法：fs.truncate(), fs.truncateSync(), fs.ftruncate(), fs.ftruncateSync();

区别：

fs.truncate()和 fs.truncateSync()可以直接使用文件路径

fs.ftruncate()和 fs.ftruncateSync()需要使用文件描述符进行操作
