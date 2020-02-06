var qs = require("querystring"),
  http = require("http");

var search = process.argv
  .slice(2)
  .join(" ")
  .trim();

if (!search.length) {
  return console.log("\n    Usage: node tweets <search term>\n");
}

console.log("searching for: \033[96m" + search + "\033[39m\n");

// one could replace by http.get with no need to call end().
// i.e: http.get({}, function(res) { ... });
http
  .request(
    {
      host: "jsonplaceholder.typicode.com",
      path: "/posts?" + qs.stringify({ userId: search })
    },
    function(res) {
      var body = "";
      res.setEncoding("utf-8");
      res.on("data", function(chunk) {
        body += chunk;
      });

      res.on("end", function() {
        var posts = JSON.parse(body);
        posts.forEach(post => {
          console.log(" \033[90m Title: " + post.title + "\033[39m");
          console.log(" \033[94m Body: " + post.body + "\033[39m");
          console.log("--");
        });
      });
    }
  )
  .end();
