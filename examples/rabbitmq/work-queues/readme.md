# RabbitMQ 一个生产者轮询多个消费者

将一个复杂的任务负载均衡到各个节点，相比只有一个消费者的队列，这样不至于队列堆积过长，同时也能保证队列的响应时间

启动两个 worker.js 来处理任务，然后执行多次客户端 new-task.js 来发送消息

结果显示：

将任务平均分给两个消费者来处理，随着任务量的增大，可以逐步地增加消费者来增强队列的计算能力