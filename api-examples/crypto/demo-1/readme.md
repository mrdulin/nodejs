# 数字签名

类似在纸质合同上签名确认合同内容，数字签名用于证实某数字内容的完整性（integrity）和来源（或不可抵赖，non-repudiation）。

一个典型的场景是，A 要发给 B 一个文件（一份信息），B 如何获知所得到的文件即为 A 发出的原始版本？A 先对文件进行摘要，然后用自己的私钥进行加密，将文件和加密串都发给 B。B 收到文件和加密串后，用 A 的公钥来解密加密串，得到原始的数字摘要，跟对文件进行摘要后的结果进行比对。如果一致，说明该文件确实是 A 发过来的，并且文件内容没有被修改过。

生成私钥:

```bash
☁  demo-1 [master] ⚡  openssl genrsa -out private-key.pem
Generating RSA private key, 2048 bit long modulus
.........+++
...............................................+++
e is 65537 (0x10001)
```

通过私钥生成公钥:

```bash
☁  demo-1 [master] ⚡  openssl rsa -in private-key.pem -pubout -out public-key.pem
writing RSA key
```
