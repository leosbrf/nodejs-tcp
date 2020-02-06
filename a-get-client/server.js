var http = require("http");
var qs = require("querystring");
// server
http
  .createServer(function(req, res) {
    var body = "";
    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      res.writeHead(200);
      res.end("Done");
      console.log("\n got name \033[90m" + qs.parse(body).name + "\033[39m\n");
    });
  })
  .listen(3000);
