const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { SessionsController } = require("./sessions/SessionsController");
var path = require("path");
public_path = path.dirname(__dirname) + "/Frontend/Gui/web-build";
const session_controller = new SessionsController();
port = 3000;
// List of sessions which have started and have not yet updated last player
// (Session starts before player is added to room)
incomplete_sessions = {};

// This enables client to fetch anything in public folder
app.use(express.static(public_path));

function connect_player(player_id, player_name, game_name) {
  return session_controller.connect_player(player_id, player_name, game_name);
}

session_controller.on("Session started", (game_state, s_id) => {
  incomplete_sessions[s_id] = { game_state };
  console.log("initialised incomplete session");
  io.to(s_id).emit("Session started", game_state, s_id);
});

session_controller.on("Update session state", (game_state, s_id) => {
  // console.log("update session state");
  // if (s_id in incomplete_sessions) {
  //   console.log("incomplete_Session check");
  //   incomplete_sessions[s_id] = game_state;
  //   console.log("incomplete_sessions updated");
  // }
  io.to(s_id).emit("Update state", game_state, s_id);
});

session_controller.on("Update session move", (move, s_id) => {
  io.to(s_id).emit("Update move", move, s_id);
});

session_controller.on("Session ended", (s_id) => {
  io.to(s_id).emit("Session ended", s_id);
  io.sockets.clients(s_id).forEach(function (s) {
    s.leave(s_id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(public_path + "/index.html");
});

// app.get("/play", (req, res) => {
//   res.sendFile(public_path + "/mock_secondary.html");
// });

io.on("connection", (socket) => {
  socket.on("connect_to_game", (game_name, callback) => {
    // console.log(game_name);
    let s_id = connect_player(socket.id, socket.data.name, game_name);
    // console.log(session_controller.sessions);
    socket.join(s_id);
    // console.log(s_id);
    callback(s_id);
    if (s_id in incomplete_sessions) {
      console.log("started send new client");
      socket.emit("Session started", incomplete_sessions[s_id], s_id);
      console.log("new client sent update");
      delete incomplete_sessions[s_id];
    }

    socket.on("update_move", (game_name, s_id, move) => {
      this.session_controller.make_move(game_name, s_id, move);
    });
  });

  socket.once("login", (username, callback) => {
    socket.data.name = username;
    callback(socket.id);
  });

  socket.once("disconnect", () => {
    // console.log("user disconnected");
  });
});

server.listen(port, () => {
  // console.log("listening on *:3000");
});
