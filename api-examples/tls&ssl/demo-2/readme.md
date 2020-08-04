# TLS 服务

`node server.js`，启动服务后，通过下面的命令可以测试证书是否正常：

```bash
☁  demo-2 [master] ⚡  openssl s_client -connect localhost:8000
CONNECTED(00000003)
depth=1 C = CN, ST = Shanghai, L = Shanghai, O = pwc, OU = NV, emailAddress = novaline@qq.com
verify error:num=19:self signed certificate in certificate chain
verify return:0
140735608497096:error:14094410:SSL routines:SSL3_READ_BYTES:sslv3 alert handshake failure:/BuildRoot/Library/Caches/com.apple.xbs/Sources/libressl/libressl-22.50.2/libressl/ssl/s3_pkt.c:1133:SSL alert number 40
140735608497096:error:140790E5:SSL routines:SSL23_WRITE:ssl handshake failure:/BuildRoot/Library/Caches/com.apple.xbs/Sources/libressl/libressl-22.50.2/libressl/ssl/s23_lib.c:124:
---
Certificate chain
 0 s:/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/CN=localhost/emailAddress=novaline@qq.com
   i:/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/emailAddress=novaline@qq.com
 1 s:/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/emailAddress=novaline@qq.com
   i:/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/emailAddress=novaline@qq.com
---
Server certificate
-----BEGIN CERTIFICATE-----
MIICaDCCAdECCQDdvfuSq2fEGDANBgkqhkiG9w0BAQUFADBuMQswCQYDVQQGEwJD
TjERMA8GA1UECAwIU2hhbmdoYWkxETAPBgNVBAcMCFNoYW5naGFpMQwwCgYDVQQK
DANwd2MxCzAJBgNVBAsMAk5WMR4wHAYJKoZIhvcNAQkBFg9ub3ZhbGluZUBxcS5j
b20wHhcNMTgwNjIwMDczMTU3WhcNMTgwNzIwMDczMTU3WjCBgjELMAkGA1UEBhMC
Q04xETAPBgNVBAgMCFNoYW5naGFpMREwDwYDVQQHDAhTaGFuZ2hhaTEMMAoGA1UE
CgwDcHdjMQswCQYDVQQLDAJOVjESMBAGA1UEAwwJbG9jYWxob3N0MR4wHAYJKoZI
hvcNAQkBFg9ub3ZhbGluZUBxcS5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJ
AoGBALv6YKWpS8vzONcDZ8ePAQ4S1fwJ1U/KMRSw+OZ27BKqU2X0vNrjCtFjdlJ9
a2BXj0LgRe+tcNs7Ho+HNlmcb39tqVwhfV6vsV/6+ZosSgyZzAgDtWURj0rjvXuM
KEg6EqGF5taUBpeEPW23PU8TYDr0YWq4T98aGaC5pwcXPIwjAgMBAAEwDQYJKoZI
hvcNAQEFBQADgYEAXwVAaEuUDDuKV2ij0uyrGLDnYSXP5EFuYQiSyJ/NH1mDF3Av
rsQrYjXoBMKzv3Qt9orJHKYJ2jFZlEIlm0GFB9q8AoguhMxzvfMMZifevF5uLlxX
s+5O7utAsgoZz0ypY8M8EC+75MLF3ugbeZMDaEpTDi4spgHxb1Z/r8tCH+E=
-----END CERTIFICATE-----
subject=/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/CN=localhost/emailAddress=novaline@qq.com
issuer=/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/emailAddress=novaline@qq.com
---
Acceptable client certificate CA names
/C=CN/ST=Shanghai/L=Shanghai/O=pwc/OU=NV/emailAddress=novaline@qq.com
---
SSL handshake has read 1685 bytes and written 138 bytes
---
New, TLSv1/SSLv3, Cipher is ECDHE-RSA-AES128-GCM-SHA256
Server public key is 1024 bit
Secure Renegotiation IS supported
Compression: NONE
Expansion: NONE
No ALPN negotiated
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES128-GCM-SHA256
    Session-ID:
    Session-ID-ctx:
    Master-Key: 80C6940C560208674C1B2FB458E64FE993205FBEA6CC6E435A8A4929631CF1611954BE20F11EA64D9AE0688B6057E5DB
    Start Time: 1529480121
    Timeout   : 300 (sec)
    Verify return code: 19 (self signed certificate in certificate chain)
---
```
