const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'SHA256';
const signature_format = 'hex';
const sign = crypto.createSign(algorithm);
const verify = crypto.createVerify(algorithm);

const data = 'some data to sign';

// sign
sign.update(data);

const privateKey = fs.readFileSync('./private-key.pem');
const signature = sign.sign(privateKey, signature_format);

console.log('signature: ', signature);

// verify
verify.update(data);

const publicKey = fs.readFileSync('./public-key.pem');
const result = verify.verify(publicKey, signature, signature_format);

console.log('verify result: ', result);
