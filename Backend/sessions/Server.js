const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { SessionsController } = require("../sessions/SessionsController");
var path = require("path");
public_path = path.dirname(path.dirname(__dirname)) + "/public";
const session_controller = new SessionsController();
port = 3000;

// This enables client to fetch anything in public folder
app.use(express.static(public_path));

function connect_player(player_id, game_name) {
  return session_controller.connect_player(player_id, game_name);
}

app.get("/", (req, res) => {
  res.sendFile(public_path + "/mock_main.html");
});

app.get("/play", (req, res) => {
  res.sendFile(public_path + "/mock_secondary.html");
});

io.on("connection", (socket) => {
  console.log(socket.id + " has connected");
  socket.on("connect_to_game", (game_name, callback) => {
    var s_id = connect_player(socket.id, game_name);
    callback({
      session_id: s_id,
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("listening on *:3000");
});
