const concat = require('async/concat');
const superagent = require('superagent');
const fs = require('fs');
const path = require('path');

const rUrl = 'http://it-ebooks-api.info/v1/';
let requests = [
	'search/angular',
	'search/react',
	'search/node',
	'search/jquery',
	'search/backbone'
];

requests = requests.map(item => item = rUrl + item);

const fetchData = (url, cb) => {
	// console.log(url);
	const urlPartial = url.split('/');
	const query = urlPartial[urlPartial.length - 1];
	console.log(`${query}--数据请求中...`)

	//promise写法
	return superagent.get(url).then(res => {
		cb(null, {query, body: res.body});
	}).catch(err => {
		cb(err.response.error);
	})

	//callback写法
	// return superagent.get(url).end((err, res) => {
	// 	if(err) {
	// 		cb(err.response.error);
	// 	} else {
	// 		cb(null, {query, body: res.body});
	// 	}
	// });
}

concat(requests, fetchData, (err, results) => {
	if(err) console.error(err.message);
	// console.log(results);
	const data = {data: results};
	console.log('开始写入数据...')
	fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(data, null, 4), 'utf-8');
	console.log('数据写入完毕!')
})
