var qs = require("querystring");

require("http")
  .createServer(function(req, res) {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <form method="POST" action="/url">
          <h1>My form</h1>
          <fieldset>
          <label>Personal information</label>
          <p>What is your name?</p>
          <input type=”text” name=”name”>
          <p><button>Submit</button></p>
        </form>
        `);
    } else if (req.url == "/url" && req.method == "POST") {
      var body = "";

      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/html" });

        // TODO qs.parse(body) not working as expected
        res.end(
          "<p>Content-Type: " +
            req.headers["content-type"] +
            "</p><p>Data: </p><pre>" +
            qs.parse(body).name +
            "</pre>"
        );
      });
    } else if (req.url == "/url") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`This as a ${req.method} request! The choosen name is: 
      ${qs.parse(req.url).name}`);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  })
  .listen(3000);
