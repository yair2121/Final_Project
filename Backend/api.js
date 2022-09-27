const { CrosswordModel } = require("./Games/Crossword");
const API_NOTIFICATION_ROOM = "api notification room";
const API_AUTOJOIN_ROOM = "api autojoin room";

function isFunction(x) {
  return typeof x === typeof isFunction;
}

function connect_socket_api(
  password,
  connection_callback,
  socket,
  session_controller
) {
  if (validate_password(password)) {
    connection_callback(socket.id); //Connection succeeded
    socket.on(
      "connect_to_session",
      (player_name, game_name, session_id, return_callback) => {
        let s_id = session_controller.connect_to_session(
          socket.id,
          player_name,
          game_name,
          session_id
        );
        if (s_id !== -1) {
          socket.join(s_id);
        }
        if (isFunction(return_callback)) {
          return_callback(s_id);
        }
      }
    );
    socket.on("update_move", (game_name, s_id, move) => {
      if (socket.rooms.has(s_id)) {
        try {
          session_controller.make_move(game_name, s_id, move);
        } catch (error) {
          socket.emit("Error", error);
        }
      } else {
        socket.emit("Error", "not in session " + s_id);
      }
    });

    socket.on("get_game_state", (game_name, s_id, return_callback) => {
      if (isFunction(return_callback)) {
        if (socket.rooms.has(s_id)) {
          try {
            let session = session_controller.get_session(game_name, s_id);
            return_callback(session.get_state());
          } catch (error) {
            return_callback("Error", error);
          }
        } else {
          return_callback("Error", "not in session " + s_id);
        }
      }
    });

    socket.on("get_unready_sessions", (game_name, return_callback) => {
      if (isFunction(return_callback)) {
        try {
          return_callback(
            Object.keys(
              session_controller.get_sessions()["unready_sessions"][game_name]
            )
          );
        } catch (error) {
          return_callback(error);
        }
      }
    });

    socket.on("get_game_report", (game_name, s_id, return_callback) => {
      if (isFunction(return_callback)) {
        try {
          let session = session_controller.get_session(game_name, s_id);
          return_callback(session.get_game_report());
        } catch (error) {
          return_callback("Error", error);
        }
      }
    });

    socket.on("set_crossword_difficulty", (difficulty, return_callback) => {
      if (Number.isInteger(difficulty) && difficulty <= 100 && difficulty > 0) {
        CrosswordModel.DIFFICULTY = difficulty;
        succeeded = true;
      } else {
        succeeded = false;
      }
      if (isFunction(return_callback)) {
        return_callback(succeeded);
      }
    });

    socket.on("set_crossword_num_of_clues", (num_of_clues, return_callback) => {
      if (
        Number.isInteger(num_of_clues) &&
        num_of_clues < 713 &&
        num_of_clues > 3
      ) {
        CrosswordModel.NUM_OF_CLUES = num_of_clues;
        succeeded = true;
      } else {
        succeeded = false;
      }
      if (isFunction(return_callback)) {
        return_callback(succeeded);
      }
    });

    socket.on("set_crossword_max_players", (max_players, return_callback) => {
      if (Number.isInteger(max_players) && max_players > 0) {
        CrosswordModel.MAX_PLAYERS = max_players;
        succeeded = true;
      } else {
        succeeded = false;
      }
      if (isFunction(return_callback)) {
        return_callback(succeeded);
      }
    });

    socket.on("start_notifications", () => {
      socket.join(API_NOTIFICATION_ROOM);
    });

    socket.on("end_notifications", () => {
      socket.leave(API_NOTIFICATION_ROOM);
    });

    socket.on("start_autojoin", () => {
      socket.join(API_AUTOJOIN_ROOM);
    });

    socket.on("end_autojoin", () => {
      socket.leave(API_AUTOJOIN_ROOM);
    });
  } else {
    connection_callback(-1); //Connection failed
  }
}

// Change this accordingly
function validate_password(password) {
  return true;
}

module.exports = {
  connect_socket_api,
  API_NOTIFICATION_ROOM,
  API_AUTOJOIN_ROOM,
};
