const { expect } = require('chai');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const algorithm = 'SHA256';
const signatureFormat = 'hex';

const privateKey = fs.readFileSync(path.resolve(__dirname, './private-key.pem'));
const publicKey = fs.readFileSync(path.resolve(__dirname, './public-key.pem'));

const data = 'some data to sign';
let sign;
let verify;
let signature;

describe('crypto demo-1 test suites', () => {
  describe('verfiy test suites', () => {
    beforeEach(() => {
      sign = crypto.createSign(algorithm);
      verify = crypto.createVerify(algorithm);
      sign.update(data);
      signature = sign.sign(privateKey, signatureFormat);
    });

    it('should verify successfully with corresponding public key and same signature format', () => {
      console.log('signature 1: ', signature);
      verify.update(data);
      const result = verify.verify(publicKey, signature, signatureFormat);
      expect(result).to.be.true;
    });

    it('should verify failed with different signature format', () => {
      console.log('signature 2: ', signature);
      verify.update(data);
      const result = verify.verify(publicKey, signature, 'latin1');
      expect(result).to.be.false;
    });

    it('should verify failed with different data', () => {
      verify.update(`${data} diff`);
      const result = verify.verify(publicKey, signature, signatureFormat);
      expect(result).to.be.false;
    });

    it('should verify failed with public key not matched the private key', () => {
      const otherPublicKey = fs.readFileSync(path.resolve(__dirname, './other-public-key.pem'));
      verify.update(data);
      const result = verify.verify(otherPublicKey, signature, signatureFormat);
      expect(result).to.be.false;
    });
  });
});
