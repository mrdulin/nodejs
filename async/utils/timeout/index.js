const timeout =  require('async/timeout');
const superagent = require('superagent');
const fs = require('fs');
const path = require('path');

//需求：异步操作的时间小于1秒时，正常执行，如果异步操作的时间大于1秒，抛出err对象，'ETIMEDOUT'

const searchBook = (query, cb) => {
	const url = `http://it-ebooks-api.info/v1/search/${query}`;

	superagent.get(url).then(res => {
		cb(null, {query, body: res.body});
	}).catch(err => {
		cb(err);
	});
}

const searchBookWrapped = timeout(searchBook, 1000);

searchBookWrapped('angular', (err, data) => {
	if(err) return console.error(err.stack);
	const result = {data};
	fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(result, null, 4));
})

