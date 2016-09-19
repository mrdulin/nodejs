const fs = require('fs');
const path = require('path');
const util = require('util');
const yargs = require('yargs');
const chalk = require('chalk');

const argv = yargs
    .usage('Usage: node $0 -p [path] -o [output path] -f [output filename] -e [exclude directory]')
    .alias({
        p: 'path',
        o: 'output',
        f: 'file',
        e: 'exclude'
    })
    .array('e')  
    .demand(['p'])
    .describe({
        p: '指定需要遍历的根目录',
        o: '指定生成的json文件的输出目录',
        f: '指定生成的json文件的文件名',
        e: '排除指定目录中的目录'
    })  
    .epilog('copyright 2016')
    .argv;

const excludeDir = (distPath, excludePaths = [], namePath, cb) => {
    if(excludePaths.length === 0) {
        cb()
    };
    for(let excludePath of excludePaths) {
        const exPathResolved = path.resolve(distPath, excludePath);
        if(exPathResolved !== namePath) {
            const index = excludePaths.indexOf(excludePath);
            cb(index);
        } else {
            console.log(namePath === exPathResolved)
        }
    }
}

const readFilePath = (distPath, prevJson, excludePaths) => {
    let names = fs.readdirSync(distPath);
    let json = prevJson || {};
    json[distPath] = {files: [], dir: {}};

    for(let name of names) {
        const namePath = path.resolve(distPath, name);

        try{
            const stats = fs.lstatSync(namePath);

                excludeDir(distPath, excludePaths, namePath, (excludePathIdx) => {
                    excludePaths = excludePaths.splice(excludePathIdx, 1);
                    if(stats.isDirectory()) {
                        json[distPath]['dir'][namePath] = {};
                        readFilePath(namePath, json[distPath]['dir'], excludePaths);
                    } else {
                        json[distPath].files.push(name);
                    }
                })

        } catch(e) {
            continue;
        }
    }

    return json;
}

const json = readFilePath(argv.p, undefined, argv.e);
let filename = 'output.json';
if(argv.f) {
    const hasExt = argv.f.toLowerCase().match(/\.(json)$/);
    filename = hasExt ? argv.f.toLowerCase() : argv.f + '.json';
}
const outputPath = path.resolve(argv.o || __dirname, filename);

fs.writeFile(outputPath, JSON.stringify(json, null, 4), 'utf8', (err) => {
    if(err) throw err;
    console.log(chalk.bgGreen('\nFilename\'s json data generate successfully!\n'));
});





