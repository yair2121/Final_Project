const express = require("express");
const { PORT } = require("../changeme");
const app = express();
const {
  connect_socket_api,
  API_NOTIFICATION_ROOM,
  API_AUTOJOIN_ROOM,
} = require("../Backend/api");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});
const { SessionsController } = require("./sessions/SessionsController");
var path = require("path");
// Path to web build files
public_path = path.dirname(__dirname) + "/Frontend/Gui/web-build";
const session_controller = new SessionsController();
// List of sessions which have started and have not yet updated last player
// (Session starts before player is added to room)
incomplete_sessions = {};

// This enables client to fetch anything in public folder
app.use(express.static(public_path));

function connect_player(player_id, player_name, game_name) {
  return session_controller.connect_player(player_id, player_name, game_name);
}

session_controller.on("Session created", async (game_name, s_id) => {
  io.to(API_NOTIFICATION_ROOM).emit("Session created", game_name, s_id);
  // Iterate over all sockets which are supposed to autojoin, and add them to session. If the session is full, stop iterating.
  sockets = await io.in(API_AUTOJOIN_ROOM).fetchSockets();
  for (const socket of sockets) {
    ret = session_controller.connect_to_session(
      socket.id,
      socket.player_name,
      game_name,
      s_id
    );
    socket.emit("Autojoined session", game_name, s_id);
    //If ret is -1 the session is full (or there is some other error preventing sockets from joining).
    if (ret === -1) {
      break;
    }
  }
});

session_controller.on("Session closed", (game_name, s_id) => {
  io.to(API_NOTIFICATION_ROOM).emit("Session closed", game_name, s_id);
});

session_controller.on("Session started", (game_state, s_id) => {
  incomplete_sessions[s_id] = game_state;
  io.to(s_id).emit("Session started", game_state, s_id);
});

session_controller.on("Update session state", (game_state, s_id) => {
  io.to(s_id).emit("Update state", game_state, s_id);
});

session_controller.on("Update session move", (move, s_id) => {
  io.to(s_id).emit("Update move", move, s_id);
});

session_controller.on("Session ended", (s_id) => {
  io.to(s_id).emit("Session ended", s_id);
  io.socketsLeave(s_id);
});

app.get("/", (req, res) => {
  res.sendFile(public_path + "/index.html");
});

io.on("connection", (socket) => {
  console.log("connect");
  // Connects a player to a game and uses callback function to respond with the session id and game state.
  socket.on("connect_to_game", (game_name, callback) => {
    let s_id = connect_player(socket.id, socket.data.name, game_name);
    socket.join(s_id);
    socket.game = game_name;
    if (s_id in incomplete_sessions) {
      console.log("started send new client");
      callback({ s_id: s_id, game_state: incomplete_sessions[s_id] });
      delete incomplete_sessions[s_id];
    } else {
      callback({ s_id: s_id, game_state: {} });
    }

    socket.on("update_move", (game_name, s_id, move) => {
      console.log(move);
      session_controller.make_move(game_name, s_id, move);
    });
  });

  socket.on("leave_game", (game_name, s_id) => {
    socket.removeAllListeners("update_move");
    socket.to(s_id).emit("left_game", game_name, socket.id);
    socket.leave(s_id);
    session_controller.disconnect_player(socket.id, game_name, s_id);
  });

  socket.once("login", (username, callback) => {
    socket.data.name = username;
    callback(socket.id);
  });

  socket.on("connect_as_api", (password, callback) => {
    if (typeof callback == "function") {
      socket.api_user = true;
      connect_socket_api(password, callback, socket, session_controller);
    }
  });

  socket.once("disconnecting", () => {
    if (!socket.api_user) {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.to(room).emit("left_game", socket.game, socket.id);
          session_controller.disconnect_player(socket.id, socket.game, room);
        }
      });
    }
  });
});

server.listen(PORT, () => {});
