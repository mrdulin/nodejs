const cheerio = require('cheerio');
const http = require('http');
const async = require('async');
const querystring = require('querystring');
const superagent = require('superagent');
const charset = require('superagent-charset');
const util = require('util');
const fs = require('fs');
const path = require('path');

const argvUrl = process.argv[2];

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
            if (path.includes('http:')) {
                url = path;
            } else {
                url = `${this.host}/${path}`;
            }

            if (url.includes('jpg')) {
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
console.log('开始下载' + argvUrl + '套图...');
const dirName = path.basename(argvUrl + '', '.html');

ajax.get(argvUrl).then(res => {
    const pageSize = dataFinder.getPageSize(res.text);
    // console.log(pageSize);
    let pageUrls = [dirName]
    for (let i = 2; i < pageSize; i++) {
        pageUrls.push(`${dirName}_${i}`);
    }

    pageUrls = pageUrls.map(path => `${host}/${category}/${path}.html`);

    return new Promise((resolve, reject) => {

        async.mapLimit(pageUrls, 3, (url, cb) => {
            ajax.get(url).then(res => {
                const picUrl = dataFinder.getPicUrl(res.text);
                cb(null, picUrl);
                // const filename = path.basename(url);
                // writeData(res, path.resolve(process.cwd(), filename), url, cb)
            })
        }, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    picUrls: results,
                    picDirName: dirName
                });
            }
        })
    })
    // const picUrl = dataFinder.getPicUrl(res.text);
}).then(({picUrls, picDirName}) => {
    const dirPath = path.resolve(process.cwd(), `${picDirName}`);
    const writeData = (res, filename, url, cb) => {
        const writeStream = fs.createWriteStream(filename);
        res.pipe(writeStream);
        writeStream.on('finish', () => {
            cb(null, console.log(`${url}，下载完成.`));
        }).on('error', cb);
    }
    const savePic = (url, idx, cb) => {
        http.get(url, res => {
            const picName = path.basename(url);
            writeData(res, path.resolve(dirPath, picName), url, cb);
        });
    }

    console.log(`保存图片中...`);
    fs.access(dirPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            fs.mkdirSync(dirPath);
        }
        async.eachOfLimit(picUrls, 1, savePic, (err) => {
            if (err) return console.error(err);
            console.log('程序执行完毕!')
        });
    })

}).catch(err => {
	console.error(err);
})
