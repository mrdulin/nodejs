const cheerio = require('cheerio');
const http = require('http');
const async = require('async');
const querystring = require('querystring');
const superagent = require('superagent');
const charset = require('superagent-charset');
const util = require('util');
const fs = require('fs');
const path = require('path');

console.log('爬虫程序开始运行...');

const host = 'http://www.duotoo.com';
const category = 'xingganmeinv';
const page = 'xingganmeinv_2.html'

charset(superagent);

class DataFinder {
	getCategoryItemLinks(html) {
		const $ = cheerio.load(html);
		const $imgList = $('#imgList');
		const $imgItems = $imgList.find('li > strong > a');
		const links = [];
		$imgItems.each((idx, item) => {
			links.push($(item).attr('href'))
		});
		return links;
	}
	getPageSize(html) {
		const $ = cheerio.load(html);
		this.$ = $;
		const pageSize = this.pageSize = Number.parseInt($('#pageinfo').attr('pageinfo'), 10);
		return pageSize;
	}
	getPicUrl(html) {
		const $ = cheerio.load(html);
		const $articlePicBox = $('.ArticlePicBox');
		const $link = $articlePicBox.find('a');
		const $img = $link.children();
		const picUrl = $img.attr('src') || $img.attr('original');
		return picUrl;
	}
	clearLoadHtml() {
		this.$ = null;
	}
}

class Ajax {
	constructor(opts) {
		this.host = opts.host;
	}

	get(path) {
		return new Promise((resolve, reject) => {
			let url = '', contentType = '';
			if(path.includes('http:')) {
				url = path;
			} else {
				url = `${this.host}/${path}`;
			}

			if(url.includes('jpg')) {
				contentType = 'image/jpg';
			} else {
				contentType = 'text/html; charset=UTF-8';
			}
			superagent
				.get(url)
				.charset('gbk')
				.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
				.set('Content-Type', contentType)
				.end((err, res) => {
					if (err || !res.ok) {
						reject(err);
					} else {
						resolve(res);
					}
				})
		})
	}
}

const ajax = new Ajax({
	host
});
const dataFinder = new DataFinder();
ajax.get(category).then(res => {
	// fs.writeFileSync('imageList.html', res.text, 'utf8');

	const imgLinks = dataFinder.getCategoryItemLinks(res.text);
	// console.log(imgLinks);

	const mockLinks = ['http://www.duotoo.com/xingganmeinv/33110.html']
	return new Promise((resolve, reject) => {
		mockLinks.forEach(link => {
			ajax.get(link).then((response) => {
				const linkPartial = link.split('/')
				const firstPagePath = linkPartial[linkPartial.length - 1].replace('.html', '');
				resolve({response, firstPagePath});
			});
		});
	})


}).then(({response, firstPagePath}) => {
	const picHtml = response.text;
	const page = 0;
	const pageSize = dataFinder.getPageSize(picHtml);
	const pagePaths = [firstPagePath];
	for(let i = 2; i <= pageSize; i++) {
		pagePaths.push(firstPagePath + '_' + i);
	}

	const pageUrls = pagePaths.map(path => `${host}/${category}/${path}.html`);

	// console.log('分类下单个套图的所有页面url地址: ')
	// console.log(pageUrls);

	const fetchPic = (url, cb) => {
		ajax.get(url).then(res => {
			const picUrl = dataFinder.getPicUrl(res.text);
			cb(null, picUrl);
		})
	}

	return new Promise((resolve, reject) => {
		async.mapLimit(pageUrls, 3, fetchPic, (err, results) => {
			console.log('分类下单个套图的所有图片url地址： ');
			console.log(results);

			if(err) {
				reject(err);
			} else {
				resolve(results);
			}
		})
	})


}).then(picUrls => {
	const savePic = (url, cb) => {
		ajax.get(url).then(res => {
			const urlPartial = url.split('/');
			const picName = urlPartial[urlPartial.length - 1];
			const writeStream = fs.createWriteStream(`images/${picName}`);
			res.pipe(writeStream);
			writeStream
				.on('finish', cb);
		})
	}
	async.forEachLimit(picUrls, 3, savePic, (err) => {
		console.log(err);
	})
}).catch(err => {
	console.log(err);
})
