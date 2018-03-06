const path = require('path');

//获取路径中最后部分

const path_resolve = path.resolve('test', 'test.txt');
const path_extname = path.extname(path_resolve);

const path_basename = path.basename(path_resolve, path_extname);

console.log('path_basename: ', path_basename);

const path_basename_st = path.basename(path_resolve, 'st.txt');
console.log('path_basename_st: ', path_basename_st);

const path_basename_test = path.basename(path_resolve, 'test.txt');
console.log('path_basename_test: ', path_basename_test);
