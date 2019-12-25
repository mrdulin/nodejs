const http = require("http");

const port = 3002;
let items = [];
const server = http.createServer((req, res) => {
  switch (req.method) {
    case "POST":
      let item = "";
      req.setEncoding("utf8");
      req.on("data", chunk => {
        item += chunk;
      });
      req.on("end", () => {
        items.push(item);
        res.end("OK\n");
      });
      break;
    case "GET":
      let body = items
        .map((item, index) => {
          return index + ")" + item;
        })
        .join("\n");
      //字节长度， 不是字符串长度
      res.setHeader("Content-Length", Buffer.byteLength(body));
      res.setHeader("Content-Type", 'text/plain; charset="UTF-8"');
      res.end(body);
      break;
  }
});

server.listen(port, () => {
  console.log("server is on port ", port);
});
