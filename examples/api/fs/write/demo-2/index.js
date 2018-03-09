const fs = require('fs');
const path = require('path');

const p = path.normalize('./test.txt');

fs.open(p, 'a', (openErr, fd) => {
  if (openErr) throw openErr;
  const buffer = Buffer.from('I want to fuck nodejs\n', 'utf8');
  const offset = 0;
  const len = buffer.length;
  const pos = 0;

  fs.write(fd, buffer, offset, len, pos, (writeErr, bytes, buf) => {
    if (writeErr) throw writeErr;
    console.log(`wrote ${bytes} bytes`);
    console.log(buf.toString('utf8'));

    fs.fsyncSync(fd);
    fs.closeSync(fd);
  });
});
