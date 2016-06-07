window.onload = init;

function init() {

    var getUserEl = document.getElementById('getUser'),
        nameEl = document.getElementById('name'),
        ageEl = document.getElementById('age'),
        getHomeEl = document.getElementById('getHome'),
        bookListEl = document.getElementById('bookList');

    getHomeEl.onclick = function(e) {
    	requestHome();
    }
    getUserEl.onclick = function(e) {
        requestUser();
    }

    function requestUser() {
		ajax('GET', '/user', function(data) {
			var user = data;
                nameEl.textContent = user.name;
                ageEl.textContent = user.age;
        }, function() {

        });
    }

    function requestHome() {
		ajax('GET', '/books', function(data) {
			var books = data;
            var i = 0,
                len = data.length,
                fragment = document.createDocumentFragment(),
                li = null;

            for(; i < len; i++) {
                li = document.createElement('li');
                li.textContent = data[i].name;
                fragment.appendChild(li);
            }
            bookListEl.innerHTML = '';
            bookListEl.appendChild(fragment);
		});	
    }

    function ajax(method, url, successCallback, failCallback) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.send();

        xhr.onreadystatechange = _onreadystatechange;

        function _onreadystatechange() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                successCallback.call(this, JSON.parse(xhr.response));
            }
        }
    }
}
