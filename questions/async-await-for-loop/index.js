require('babel-polyfill');
const superagent = require('superagent');

const API = 'http://it-ebooks-api.info/v1/';

const querys = [
    'angular',
    'react',
    'jquery',
    'backbone'
];

const queryUrls = [];

for(let query of querys) {
    let queryUrl = API + query;
    queryUrls.push(queryUrl);
}

console.log(queryUrls);

function fetchData(url) {
    return superagent.get(url).then(res => {
        return res.body;
    });
}

async function start() {
    const results = [];
    for(let url of urls) {
        const data = await fetchData();
        results.push(data);
    }
    return results;
}

start(queryUrls).then(datas => {
    console.log(datas);
}).catch(e => {
    console.error(e);
})


