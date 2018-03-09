const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const model = require('./model');

model
  .read()
  .then(json => console.log(json))
  .catch(reason => console.error(reason));

// const port = 3000;
// const dataPath = path.resolve(__dirname, 'todos.json');

// function start(data) {
//   const httpServer = http.createServer();
//   const requestListener = (req, res) => {
//     req.on('error', err => {
//       console.log(err);
//       res.statusCode = 500;
//       res.end();
//     });
//     res.on('error', err => {
//       console.log(err);
//     });

//     switch (req.url) {
//       case '/':
//         switch (req.method) {
//           case 'GET':
//             showTodoList(res, data);
//             break;
//           case 'POST':
//             addTodo(req, res, data);
//             break;
//           default:
//             badRequest(res);
//         }
//         break;
//       case '/delete':
//         deleteTodo(req, res);
//         break;
//       default:
//         NotFound(res);
//         break;
//     }
//   };

//   httpServer.on('request', requestListener);
//   httpServer.listen(port, err => {
//     if (err) {
//       console.log('Error starting http server');
//     } else {
//       console.log(`Server is listen on port http://localhost:${port}`);
//     }
//   });

//   readTodo()
//     .then(start)
//     .catch(err => {
//       throw err;
//     });

//   const badRequest = res => {
//     res.statusCode = 500;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Bad Request');
//   };

//   const NotFound = res => {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Not Found');
//   };

//   const renderTodoList = (data, res) => {
//     const itemTpl = data.items
//       .map(item => {
//         return `<li data-id=${item.id}>
//                 <a>${item.name}</a>
//                 <button type='button'>done!</button>
//             </li>`;
//       })
//       .join('');

//     if (res) {
//       res.setHeader('Content-Type', 'text/html');
//       res.setHeader('Content-Length', Buffer.byteLength(itemTpl));

//       res.end(itemTpl);
//     } else {
//       return itemTpl;
//     }
//   };

//   const showTodoList = (res, data) => {
//     const todoListClick = `"
//             if(event.target.nodeName.toLowerCase() === 'button') {
//                 var li = event.target.parentNode;
//                 var id = li.dataset.id;
//                 var xhr = new XMLHttpRequest();
//                 xhr.onreadystatechange = function() {
//                     if(xhr.readyState === 4 && xhr.status === 200) {
//                         document.getElementById('todoList').innerHTML = xhr.responseText;
//                     }
//                 }
//                 xhr.open('post', 'http://localhost:3000/delete', true);
//                 xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded' );
//                 xhr.send('id=' + id);
//             }
//         "`;

//     const itemTpl = renderTodoList(data);

//     const html = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <title>TodoList</title>
//         </head>
//         <body>
//             <h1>Todo List</h1>
//             <ul onclick=${todoListClick} id='todoList'>${itemTpl}</ul>
//             <form action='/' method='post'>
//                 <label>todo: <input type='text' name='item'/></label>
//                 <input type='submit' value='add item'/>
//             </form>
//         </body>
//         </html>
//         `;

//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Content-Length', Buffer.byteLength(html));

//     res.end(html);
//   };

//   const saveTodo = (res, datas) => {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(dataPath, JSON.stringify(datas, null, 4), 'utf8', err => {
//         if (err) reject(err);
//         console.log(`Save todo data successFully!`);
//         resolve({ res, datas });
//       });
//     });
//   };

//   const deleteTodo = (req, res) => {
//     let body = '';
//     req
//       .setEncoding('utf8')
//       .on('data', chunk => {
//         body += chunk;
//       })
//       .on('end', () => {
//         let id = qs.parse(body).id;
//         readTodo()
//           .then(data => {
//             const { length: len } = data.items;
//             if (!len) return reject('no data');
//             for (let i = 0; i < len; i++) {
//               if (data.items[i].id == id) {
//                 data.items.splice(i, 1);
//                 break;
//               }
//             }
//             return Promise.resolve({ res, data });
//           })
//           .then(({ res, data }) => {
//             return saveTodo(res, data);
//           })
//           .then(({ res, datas }) => {
//             renderTodoList(datas, res);
//           })
//           .catch(err => {
//             throw err;
//           });
//       });
//   };

//   const addTodo = (req, res, data) => {
//     let body = '';
//     req.setEncoding('utf8');
//     req.on('data', chunk => {
//       body += chunk;
//     });
//     req.on('end', () => {
//       console.log('body', body);
//       let obj = qs.parse(body);
//       console.log('obj', obj);
//       const todo = { id: data.items.length + 1, name: obj.item };
//       data.items.push(todo);
//       saveTodo(res, data)
//         .then(({ res, datas }) => {
//           renderTodoList(datas, res);
//         })
//         .catch(err => {
//           throw err;
//         });
//     });
//   };
// }
