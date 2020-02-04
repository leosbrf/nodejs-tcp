require("http")
  .createServer(function(req, res) {
    //console.log(req.headers);
    console.log(req.connection);
    res.writeHead(200, { "Content-Type": "image/png" });

    require("fs")
      .createReadStream("image.png")
      .pipe(res);
  })
  .listen(3000);
