const fs = require('fs');
const path = require('path');

let args = process.argv.splice(2);
let command = args.shift();
let taskDesc = args.join(' ');
const file = path.join(process.cwd(), '/.tasks');


const commandMapToMethod = (command, file) => {
  switch (command) {
    case 'add':
      addTask(taskDesc, file);
      break;
    case 'list':
      listTask(file);
      break;
  }
};

const addTask = (taskDesc, file) => {
  loadOrInitialTaskArray(file, (tasks) => {
    tasks.push(taskDesc);
    storeTask(file, tasks);
  });
};

const listTask = (file) => {
  loadOrInitialTaskArray(file, (tasks) => {
    const len = tasks.length;
    for (let i = 0; i < len; i++) {
      process.stdout.write(`${i + 1}. ${tasks[i]}\n`);
    }
  });
};

const loadOrInitialTaskArray = (file, cb) => {
  let tasks = [];
  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        cb(tasks);
      } else {
        console.log('Error code ', err.code);
      }
    } else {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        let dataString = data.toString();
        tasks = JSON.parse(data || '[]');
        cb(tasks);
      });
    }
  });
};

const storeTask = (file, tasks) => {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', (err) => {
    if (err) throw err;
    console.log('task saved!');
  });
};

commandMapToMethod(command, file);
