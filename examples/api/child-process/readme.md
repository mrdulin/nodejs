# child_process 模块

通过实现子进程来实现对多核心 CPU 的有效利用

child_process 模块提供了 4 个创建子进程的方法，分别是`spawn()`、`exec()`、`execFile()`、`fork()`。

其中`spawn()`是最原始的创建子进程的方法，其他三个都是通过对`spawn()`方法不同程度地进一步封装实现的。使用 child_process 模块提供的这些方法，可以实现多进程任务、操作 shell 和进程通信等操作
