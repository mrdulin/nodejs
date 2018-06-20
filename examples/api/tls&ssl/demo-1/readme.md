# demo-1

TLS/SSL 是一个 PKI。对于大多数使用场景，每个客户端和服务端必须有一个私钥。

1.  生成 2048 位的使用 RSA 非对称加密算法的私钥：

```bash
☁  tls&ssl [master] openssl genrsa -out ryans-key.pem 2048
Generating RSA private key, 2048 bit long modulus
...+++
..................................+++
e is 65537 (0x10001)
```

2.  所有服务端，可能还有部分客户端必须有一个证书。证书是与私钥相对应的公钥，并且由证书颁发机构或私钥所有者进行数字签名（这些证书称为“自签名”）。获取证书的第一步是创建 Certificate Signing Request (CSR)文件。

```bash
☁  tls&ssl [master] ⚡  openssl req -new -sha256 -key ./demo-1/ryans-key.pem -out ./demo-1/ryans-csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:CN
State or Province Name (full name) []:Shanghai
Locality Name (eg, city) []:Shanghai
Organization Name (eg, company) []:pwc
Organizational Unit Name (eg, section) []:saleforces
Common Name (eg, fully qualified host name) []:
Email Address []:novaline@qq.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
```

CSR 文件生成后，它可以发送给证书颁发机构进行签名或用于生成自签名证书。

3.  下面的示例说明了如何使用 OpenSSL 命令行界面创建自签名证书：

```bash
☁  tls&ssl [master] ⚡  openssl x509 -req -in ./demo-1/ryans-csr.pem -signkey ./demo-1/ryans-key.pem -out ./demo-1/ryans-cert.pem
Signature ok
subject=/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=saleforces/emailAddress=novaline@qq.com
Getting Private key
```
