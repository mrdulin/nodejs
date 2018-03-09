const buffer = Buffer.from('nodejs');

if (Buffer.isBuffer(buffer)) {
  console.log('The "buffer" is Buffer obj');
}

const str = 'nodejs';
if (Buffer.isBuffer(str)) {
  console.log('The "str" is a Buffer obj');
} else {
  console.log('The "str" is not a Buffer obj');
}
