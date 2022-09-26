const io = require("socket.io-client");

const socket = io("http://localhost:3000");
socket.prependAny((eventName, ...args) => {
  console.log("Event: " + eventName);
  console.log(args);
});
socket.emit("connect_as_api", "ayo", (arg) => {
  // console.log(arg);
  // socket.emit("get_unready_sessions", "Crossword", (unready_sessions) => {
  //   unready_sessions.forEach((s_id) => {
  //     console.log(s_id);
  //     connect_to_session("admin", s_id);
  //   });
  // });
  // set_crossword_difficulty(10);
  // set_crossword_num_of_clues(3);
  get_game_report("Crossword", "82aa1bd0-3dd8-11ed-b082-ebf44bdfc7ff");
  join_notifications();
  leave_notifications();
});

function connect_to_session(player_name, session_id) {
  console.log(player_name);
  console.log(session_id);
  socket.emit(
    "connect_to_session",
    player_name,
    "Crossword",
    session_id,
    (arg) => {
      console.log(arg);
      get_game_state("Crossword", arg);
      //disconnect("Crossword", session_id);
    }
  );
}

function get_game_state(game_name, s_id) {
  socket.emit("get_game_state", game_name, s_id, (...args) => {
    console.log(args[0].boardDescription.boardWords);
  });
}

function get_game_report(game_name, s_id) {
  socket.emit("get_game_report", game_name, s_id, (...args) => {
    console.log(args[0]);
  });
}

function disconnect(game_name, s_id) {
  socket.emit("leave_game", game_name, s_id);
}

function set_crossword_difficulty(d) {
  socket.emit("set_crossword_difficulty", d, console.log);
}

function set_crossword_num_of_clues(n) {
  socket.emit("set_crossword_num_of_clues", n, console.log);
}

function join_notifications() {
  socket.emit("join_notifications");
}

function leave_notifications() {
  socket.emit("leave_notifications");
}
