console.log('用户输入数据');

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk) {
    process.stdout.write('Print Data: ', chunk, '\n');
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end.\n');
});
