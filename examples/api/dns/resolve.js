// 使用resolve方法将域名解析为DNS记录

// dns.resolve(hostname, [rrtype], callback);

// rrtype参数为一个字符串，用于指定需要获取的记录类型

const dns = require('dns');

const hostname = 'www.google.com';
const rrtype = 'A';
dns.resolve(hostname, rrtype, (err, addresses) => {
  if (err) throw err;
  console.log(addresses);
});

// 等价于
dns.resolve4(hostname, (err, addresses) => {
  if (err) throw err;
  console.log(addresses);
});
