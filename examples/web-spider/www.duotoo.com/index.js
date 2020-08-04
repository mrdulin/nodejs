const cheerio = require('cheerio');
const http = require('http');
const async = require('async');
const querystring = require('querystring');
const superagent = require('superagent');
const charset = require('superagent-charset');
const util = require('util');
const fs = require('fs');
const path = require('path');
const url = require('url');
charset(superagent);

console.log('爬虫程序开始运行...');

//输入的网址是这样的：http://www.duotoo.com/xingganmeinv/33333.html 或者 http://www.duotoo.com/xingganmeinv/33333

const categories = new Map([['性感美女', 'xingganmeinv'], ['长腿美女', 'changtuimeinv']]);
const host = `http://www.duotoo.com/${categories.get('性感美女')}`;
let startTime, endTime, ajax, dataFinder, queryUrl;
let argvUrl = process.argv[2];
const urlObject = url.parse(argvUrl);

if (!urlObject.hostname) {
  queryUrl = host + '/' + urlObject.pathname;
}

if (queryUrl.indexOf('.html') === -1) {
  queryUrl = queryUrl + '.html';
}

console.log(queryUrl);

class DataFinder {
  getCategoryItemLinks(html) {
    const $ = cheerio.load(html);
    const $imgList = $('#imgList');
    const $imgItems = $imgList.find('li > strong > a');
    const links = [];
    $imgItems.each((idx, item) => {
      links.push($(item).attr('href'));
    });
    return links;
  }
  getPageSize(html) {
    const $ = cheerio.load(html);
    const pageSize = (this.pageSize = Number.parseInt($('#pageinfo').attr('pageinfo'), 10));
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
  getAblumInfos(html) {
    const $ = cheerio.load(html);
    const title = $('.ArticleH1 > h1').text();
    const updateDateTxt = $('.ArticleH1 > p')
      .contents()
      .filter((idx, el) => el.nodeType === 3)
      .last()
      .text();
    const updateDate = updateDateTxt
      .split('|')[2]
      .trim()
      .split(' ')[1];
    return { title, updateDate };
  }
}

class Ajax {
  constructor(opts) {
    this.host = opts.host;
  }

  get(rUrl) {
    return new Promise((resolve, reject) => {
      let urlstring = '',
        contentType = '';
      if (rUrl.indexOf('http:') !== -1) {
        urlstring = rUrl;
      } else {
        urlstring = `${this.host}/${rUrl}`;
      }

      if (urlstring.includes('jpg')) {
        contentType = 'image/jpg';
      } else {
        contentType = 'text/html; charset=UTF-8';
      }
      superagent
        .get(urlstring)
        .charset('gbk')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
        // .set('Upgrade-Insecure-Requests', 1)
        // .set('Cookie', 'UM_distinctid=15b74528829949-0adec74a445f7b-396a7807-fa000-15b7452882a587; CNZZDATA1256411185=180352617-1492302210-%7C1492302210; Hm_lvt_d5dc3b6f8b90f1db39c70201788269f6=1492305218; Hm_lpvt_d5dc3b6f8b90f1db39c70201788269f6=1492305737')
        .set('Content-Type', contentType)
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }
}

/**
 * @desc 获取相册id;
 * @returns {String} xingganmeinv/33333
 */
const getAlbumKey = fullUrl => {
  return url.parse(fullUrl).pathname.split('.')[0];
};

const fetchAllPicUrlsFromAlbum = res => {
  startTime = new Date().getTime();
  const pageSize = dataFinder.getPageSize(res.text);
  // console.log(pageSize);
  const pageId = queryUrl.replace('.html', '');
  let pageUrls = [queryUrl];

  for (let i = 2; i <= pageSize; i++) {
    pageUrls.push(`${pageId}_${i}.html`);
  }

  const { title: ablumName, updateDate } = dataFinder.getAblumInfos(res.text);
  const ablumId = path.basename(queryUrl, '.html');
  console.log(`开始下载<<<${updateDate}__${ablumId}__${ablumName}>>>套图...`);

  return new Promise((resolve, reject) => {
    async.mapLimit(
      pageUrls,
      10,
      (url, cb) => {
        ajax.get(url).then(res => {
          const picUrl = dataFinder.getPicUrl(res.text);
          cb(null, picUrl);
        });
      },
      (err, picUrls) => {
        if (err) {
          reject(err);
        } else {
          resolve({ picUrls, ablumName, ablumId, updateDate });
        }
      }
    );
  });
};

const fetchAllPic = ({ picUrls, ablumName, ablumId, updateDate }) => {
  const dirPath = path.resolve(process.cwd(), `${updateDate}__${ablumId}__${ablumName}}`);
  const writeData = (res, filename, url, cb) => {
    const writeStream = fs.createWriteStream(filename);
    res.pipe(writeStream);
    writeStream
      .on('finish', () => {
        cb(null, console.log(`${url}，下载完成.`));
      })
      .on('error', cb);
  };
  const savePic = (url, idx, cb) => {
    http.get(url, res => {
      const picName = path.basename(url);
      writeData(res, path.resolve(dirPath, picName), url, cb);
    });
  };

  console.log(`保存图片中...`);
  fs.access(dirPath, fs.constants.F_OK | fs.constants.W_OK, err => {
    if (err) {
      fs.mkdirSync(dirPath);
    }
    async.eachOfLimit(picUrls, 10, savePic, err => {
      if (err) return console.error(err);
      endTime = Date.now();
      const totalTime = new Date(startTime - endTime);
      console.log('程序执行完毕!总耗时: %s秒', totalTime.getSeconds());
    });
  });
};

const handleErr = err => {
  console.error(err);
};
const main = () => {
  ajax = new Ajax({ host });
  dataFinder = new DataFinder();
  ajax
    .get(queryUrl)
    .then(fetchAllPicUrlsFromAlbum)
    .then(fetchAllPic)
    .catch(handleErr);
};

main();
