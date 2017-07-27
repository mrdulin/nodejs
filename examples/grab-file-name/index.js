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
  if (excludePaths.length === 0) {
    cb()
  };
  const exPathsResolved = excludePaths.map(excludePath => path.resolve(distPath, excludePath));
  if (exPathsResolved.indexOf(namePath) === -1) {
    cb();
  }
}

const readFilePath = (distPath, prevJson, excludePaths) => {
  let names = fs.readdirSync(distPath);
  let json = prevJson || {};
  json[distPath] = { files: [], dir: {} };

  for (let name of names) {
    const namePath = path.resolve(distPath, name);

    try {
      const stats = fs.lstatSync(namePath);

      if (stats.isDirectory()) {
        excludeDir(distPath, excludePaths, namePath, () => {
          json[distPath]['dir'][namePath] = {};
          readFilePath(namePath, json[distPath]['dir'], excludePaths);
        })
      } else {
        json[distPath].files.push(name);
      }

    } catch (e) {
      continue;
    }
  }

  return json;
}

const getOutputFilename = (fname) => {
  let filename = 'output.json';
  if (fname) {
    const hasExt = fname.toLowerCase().match(/\.(json)$/);
    filename = hasExt ? fname.toLowerCase() : fname + '.json';
  }
  return filename;
}

const writeDataToFile = (json) => {
  const filename = getOutputFilename(argv.f);
  const outputPath = path.resolve(argv.o || __dirname, filename);

  fs.writeFile(outputPath, JSON.stringify(json, null, 4), 'utf8', (err) => {
    if (err) throw err;
    console.log(chalk.bgGreen('\nFilename\'s json data generate successfully!\n'));
  });
}

const getExcludeDir = (excludeDirs = []) => {
  const excludeDirsDefault = ['bower_components', 'node_modules', '.git', '.idea'];
  return excludeDirsDefault.concat(excludeDirs);
}

const excludeDirs = getExcludeDir(argv.e);
const json = readFilePath(argv.p, undefined, excludeDirs);

writeDataToFile(json);




