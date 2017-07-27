window.onload = init;

function init() {

  var getUserEl = document.getElementById('getUser'),
    nameEl = document.getElementById('name'),
    ageEl = document.getElementById('age'),
    getHomeEl = document.getElementById('getHome'),
    bookListEl = document.getElementById('bookList');

  getHomeEl.onclick = function (e) {
    requestHome();
  }
  getUserEl.onclick = function (e) {
    requestUser();
  }

  function requestUser() {
    ajax('GET', '/user', function (data) {
      var user = data;
      nameEl.textContent = user.name;
      ageEl.textContent = user.age;
    }, function () {

    });
  }

  function requestHome() {
    ajax('GET', '/books', function (data) {
      var books = data;
      var i = 0,
        len = data.length,
        fragment = document.createDocumentFragment(),
        li = null;

      for (; i < len; i++) {
        li = document.createElement('li');
        li.textContent = data[i].name;
        fragment.appendChild(li);
      }
      bookListEl.innerHTML = '';
      bookListEl.appendChild(fragment);
    });
  }

  function groupLog(title, logs) {
    console.group(title);
    logs.forEach(log => {
      console.log(log[0], log[1]);
    });
    console.groupEnd();
  }

  function ajax(method, url, successCallback, failCallback) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onloadstart = _onloadstart;
    xhr.onreadystatechange = _onreadystatechange;
    xhr.onprogress = _onprogress;
    xhr.onload = _onload;
    xhr.onloadend = _onloadend;

    /**
     * onprogress事件回调方法在 readyState==3 状态时开始触发, 默认传入 ProgressEvent 对象, 可通过 e.loaded/e.total 来计算加载资源的进度, 该方法用于获取资源的下载进度.
     * 注意: 该方法适用于 IE10+ 及其他现代浏览器.
     */
    function _onprogress(e) {
      groupLog('xhr onprogress event', [
        ['progress:', e.loaded/e.total]
      ]);
    }

    /**
     * onloadstart事件回调方法在ajax请求发送之前触发, 触发时机在 readyState==1 状态之后, readyState==2 状态之前.
     * onloadstart方法中默认将传入一个ProgressEvent事件进度对象.
     */
    function _onloadstart(event) {
      groupLog('xhr onloadstart event', [
        ['event', event]
      ]);
    }


    /**
     * onreadystatechange事件回调方法在readystate状态改变时触发,
     * 在一个收到响应的ajax请求周期中, onreadystatechange 方法会被触发4次.
     * 因此可以在 onreadystatechange 方法中绑定一些事件回调,
     *
     * 注意: onreadystatechange回调中默认会传入Event实例,
     */
    function _onreadystatechange(e) {
      groupLog('xhr onreadystatechange event', [
        ['xhr.readyState', this.readyState],
        ['xhr.statusText', this.statusText],
        ['event', e]
      ]);
      if (xhr.readyState === 4) {
        var status = xhr.status;
        if(status === 200) {
          successCallback.call(this, JSON.parse(xhr.response));
        }
      }
    }

    function _onload() {
      var status = this.status;
      if((status >= 200 && status < 300) || status === 304) {
        groupLog('xhr onload event', [
          ['xhr.response', xhr.response],
          ['xhr.responseText', xhr.responseText]
        ]);
      }
    }

    /**
     * onloadend事件回调方法在ajax请求完成后触发, 触发时机在 readyState==4 状态之后(收到响应时) 或者 readyState==2 状态之后(未收到响应时).
     * onloadend方法中默认将传入一个ProgressEvent事件进度对象.
     *
     * @param {any} e
     */
    function _onloadend(e) {
      groupLog('xhr onloadend event', [
        ['xhr.readyState', this.readyState]
      ]);
    }

    xhr.send();
  }
}
