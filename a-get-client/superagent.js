var request = require("superagent");
request
  .get("https://jsonplaceholder.typicode.com/posts?")
  .query({ userId: 1 })
  .end(function(err, res) {
    console.log(res.body);
    console.log("\n033[90m------\n");
    console.log("\n033[90m------\n");
    console.log("\n033[90m------\n");
    console.log("\n033[90m------\n");
    console.log(res.text);
  });
