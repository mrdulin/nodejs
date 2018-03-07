const cluster = require('cluster');
const cpus = require('os').cpus();

cluster.setupMaster({
  exec: 'server.js'
});

for (let i = 0; i < cpus.length; i += 1) {
  const worker = cluster.fork();
  console.log(`Create worker. pid: ${worker.process.pid}`);
}

cluster.on('disconnect', worker => {
  console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);
});

cluster.on('exit', (worker, code, signal) => {
  console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
  const newWorker = cluster.fork();
  console.log('CLUSTER: Worker %d started', newWorker.id);
});
