const cluster = require('cluster');
const os = require('os');
const startServer = require('./server');

function startWorker() {
  const worker = cluster.fork();
  console.log('CLUSTER: Worker %d started', worker.id);
}

if (cluster.isMaster) {
  os.cpus().forEach(() => {
    startWorker();
  });

  cluster.on('disconnect', worker => {
    console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
    startWorker();
  });
} else {
  console.log('start server');
  startServer();
}
