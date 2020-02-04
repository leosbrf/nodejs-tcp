var net = require("net");

var count = 0,
  users = {};

var server = net.createServer(conn => {
  conn.setEncoding("utf-8");
  conn.write(
    "\n > welcome to \033[92mnode-chat\033[39m!" +
      "\n > " +
      count +
      " other people are connected at this time." +
      "\n > please write your name and press enter: "
  );
  count++;

  var nickname;

  conn.on("data", data => {
    data = data.replace("\r\n", "");

    if (!nickname) {
      if (users[data]) {
        conn.write("\033[93m> nickname already in use. try again: \033[39m ");
        return;
      } else {
        nickname = data;
        users[nickname] = conn;
        broadcast("\033[90m > " + nickname + " joined the room\033[39m\n");
      }
    } else {
      broadcast("\033[96m > " + nickname + ":\033[39m" + data + "\n");
    }
  });

  conn.on("close", () => {
    count--;
    delete users[nickname];
    broadcast("\033[90m > " + nickname + " left the room\033[39m\n");
  });
});

function broadcast(msg, exceptMyself) {
  for (const i in users) {
    if (!exceptMyself || i != nickname) {
      users[i].write(msg);
    }
  }
}

server.listen(3000, () => {});
