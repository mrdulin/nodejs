ajax.get(category).then(res => {
    // fs.writeFileSync('imageList.html', res.text, 'utf8');

    const imgLinks = dataFinder.getCategoryItemLinks(res.text);
    // console.log(imgLinks);

    // const mockLinks = ['http://www.duotoo.com/xingganmeinv/33110.html']
    console.log(`>>获取分类下当前页所有套图的地址`)

    const fetchPicUrl = (link, cb) => {
        ajax.get(link).then((response) => {
            const linkPartial = link.split('/')
            const firstPagePath = linkPartial[linkPartial.length - 1].replace('.html', '');
            cb(null, { response, firstPagePath });
        });
    }
    return new Promise((resolve, reject) => {
        async.mapLimit(imgLinks, 3, fetchPicUrl, (err, results) => {
            if (err) {
                err.msg = '获取套图下所有图片的地址失败';
                err.code = 10000;
                return reject(err);
            }
            resolve(results);
        })
    })


}).then(results => {
    console.log('>>获取套图下所有图片的地址')

    const getPicUrls = ({response, firstPagePath}) => {
        const picHtml = response.text;
        const page = 0;
        const pageSize = dataFinder.getPageSize(picHtml);
        const pagePaths = [firstPagePath];
        for (let i = 2; i <= pageSize; i++) {
            pagePaths.push(firstPagePath + '_' + i);
        }
        return pagePaths;
    }

    const pagePathsArr = results.map(getPicUrls);

    for (let i = 0, arrLen = pagePathsArr.length; i < arrLen; i++) {
        let pagePaths = pagePathsArr[i];
        pagePathsArr[i] = pagePaths.map(pagePath => {
            return `${host}/${category}/${pagePath}.html`
        });

    }

    // console.log('分类下单个套图的所有页面url地址: ')
    // console.log(pageUrls);

    const fetchPic = (pagePaths, cb) => {
        async.mapLimit(pagePaths, 3, (url, callback) => {
            ajax.get(url).then(res => {
                const picUrl = dataFinder.getPicUrl(res.text);
                callback(null, picUrl);
            })
        }, (err, results) => {
            if (err) cb(err);
            cb(null, results);
        })
    }

    return new Promise((resolve, reject) => {
        async.mapLimit(pagePathsArr, 3, fetchPic, (err, results) => {
            // console.log('分类下单个套图的所有图片url地址： ');
            // console.log(results);

            if (err) {
                reject(err);
            } else {
                resolve({
                    picUrls: results,
                    picDirName: firstPagePath
                });
            }
        })
    })


}).then(({picUrls, picDirName}) => {
    const dirPath = path.resolve(__dirname, `${picDirName}`);
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
    if (err.code === 10000) {
        return console.error(err.msg);
    }
    console.error(err);
})
