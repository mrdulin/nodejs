const cheerio = require('cheerio');
const http = require('http');
const async = require('async');
const querystring = require('querystring');
const superagent = require('superagent');

console.log('爬虫程序开始运行...');

const postData = querystring.stringify({
        info: 'isempty', 
		star : [0,0,0,1,0], 
		job : [0,0,0,0,0,0,0,0], 
		type : [0,0,0,0,0,0,0], 
		phase : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		cate : [0,0,0,0,0,0,0,0,0,0], 
		phases : ['初代', '第一期','第二期','第三期','第四期','第五期','第六期', '第七期','第八期','第九期','第十期','第十一期','第十二期','第十三期','第十四期', '第十五期', '第十六期'],
		cates : ['活動限定','限定角色','聖誕限定','正月限定','黑貓限定','中川限定','茶熊限定','夏日限定']
});

const req = http.request({
    hostname: 'wcatproject.com',
    port: '80',
    path: '/charSearch/function/getData.php',
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': Buffer.byteLength(postData)
    }
}, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();

const fetchInfo = (heroId, cb) => {
   superagent
    	.get('http://wcatproject.com/char/' + heroId)
        .end((err, res) => {
            const $ = cheerio.load(res.text, {decodeEntities: false});
            console.log(heroId + '\t' + $('.leader-skill span').last().text())
            cb(null, heroId);
        })
}

// superagent
//     .post('http://wcatproject.com/charSearch/function/getData.php')
//     .send({
//         info: 'isempty', 
// 		star : [0,0,0,1,0], 
// 		job : [0,0,0,0,0,0,0,0], 
// 		type : [0,0,0,0,0,0,0], 
// 		phase : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 		cate : [0,0,0,0,0,0,0,0,0,0], 
// 		phases : ['初代', '第一期','第二期','第三期','第四期','第五期','第六期', '第七期','第八期','第九期','第十期','第十一期','第十二期','第十三期','第十四期', '第十五期', '第十六期'],
// 		cates : ['活動限定','限定角色','聖誕限定','正月限定','黑貓限定','中川限定','茶熊限定','夏日限定']
//     })
//     .set('Accept', 'application/json, text/javascript, */*; q=0.01')
//     .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
//     .end((err, res) => {
//         const heroes = JSON.parse(res.text);
//         async.mapLimit(heroes, 1, (hero, cb) => {
//             const heroId = hero[0];
//             fetchInfo(heroId, cb);
//         }, (err, results) => {
//             console.log('抓取角色数量：' + results.length);
//         });

//     })
