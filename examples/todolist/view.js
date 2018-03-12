function listView(data) {
  const list = data.items
    .map(item => {
      return `<li data-id=${item.id}>
            <a>${item.name}</a>
            <button type='button'>done!</button>
        </li>`;
    })
    .join('');

  return list;
}

function appView(data) {
  const todoListClick = `"
  if(event.target.nodeName.toLowerCase() === 'button') {
      var li = event.target.parentNode;
      var id = li.dataset.id;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if(xhr.readyState === 4 && xhr.status === 200) {
              console.log(xhr.responseText);
              document.getElementById('todoList').innerHTML = xhr.responseText;
          }
      }
      xhr.open('post', 'http://localhost:3000/delete', true);
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded' );
      xhr.send('id=' + id);
  }
"`;

  const todoListView = listView(data);

  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>TodoList</title>
        </head>
        <body>
            <h1>Todo List</h1>
            <ul onclick=${todoListClick} id='todoList'>${todoListView}</ul>
            <form action='/' method='post'>
                <label>todo: <input type='text' name='item'/></label>
                <input type='submit' value='add item'/>
            </form>
        </body>
        </html>
        `;
  return html;
}

module.exports = {
  appView,
  listView
};
