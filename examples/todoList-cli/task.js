const fs = require('fs');
const path = require('path');

const args = process.argv.splice(2);
const command = args.shift();
const taskDesc = args.join(' ');
const filepath = path.join(process.cwd(), 'task.txt');

const loadOrInitialTaskArray = (file, cb) => {
  let tasks = [];
  fs.stat(file, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        cb(tasks);
      } else {
        console.error('Error code ', err.code);
      }
    } else {
      fs.readFile(file, 'utf8', (readErr, data) => {
        if (readErr) throw readErr;
        const dataString = data.toString() || '[]';
        tasks = JSON.parse(dataString);
        cb(tasks);
      });
    }
  });
};

const storeTask = (file, tasks) => {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', err => {
    if (err) throw err;
    console.log('task saved!');
  });
};

const addTask = (taskDesc, file) => {
  loadOrInitialTaskArray(file, tasks => {
    tasks.push(taskDesc);
    storeTask(file, tasks);
  });
};

const listTask = file => {
  loadOrInitialTaskArray(file, tasks => {
    const len = tasks.length;
    for (let i = 0; i < len; i += 1) {
      process.stdout.write(`${i + 1}. ${tasks[i]}\n`);
    }
  });
};

const commandMapToMethod = (cmd, file) => {
  switch (cmd) {
    case 'add':
      addTask(taskDesc, file);
      break;
    case 'list':
      listTask(file);
      break;
    default:
      break;
  }
};

commandMapToMethod(command, filepath);
