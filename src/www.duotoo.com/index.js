const cheerio = require('cheerio');
const http = require('http');
const async = require('async');
const querystring = require('querystring');
const superagent = require('superagent');
const charset = require('superagent-charset');
const util = require('util');
const fs = require('fs');

console.log('爬虫程序开始运行...');

const host = 'http://www.duotoo.com';
const category = 'xingganmeinv';

charset(superagent);
superagent
	.get(`${host}/${category}`)
	.charset('gbk')
	.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
	.set('Content-Type','text/html; charset=UTF-8')
	.end((err, res) => {
		// console.log(res.text);
		fs.writeFileSync('test.html', res.text, 'utf8');
	})
