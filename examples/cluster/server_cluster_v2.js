const cluster = require('cluster');

cluster.setupMaster({
  exec: 'server.js'
});

const cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
  const worker = cluster.fork();
  console.log('Create worker. pid: ' + worker.process.pid);
}

cluster.on('disconnect', worker => {
  console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);
});

cluster.on('exit', (worker, code, signal) => {
  console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
  const newWorker = cluster.fork();
  console.log('CLUSTER: Worker %d started', newWorker.id);
});
