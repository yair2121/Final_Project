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
        return_callback(s_id);
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
      if (socket.rooms.has(s_id)) {
        try {
          let session = session_controller.get_session(game_name, s_id);
          return_callback(session.get_state());
        } catch (error) {
          return_callback("Error", error);
        }
      } else {
        console.log(socket.rooms);
        return_callback("Error", "not in session " + s_id);
      }
    });
    socket.on("get_unready_sessions", (game_name, return_callback) => {
      return_callback(
        Object.keys(
          session_controller.get_sessions()["unready_sessions"][game_name]
        )
      );
    });
  } else {
    connection_callback(-1); //Connection failed
  }
}

// Change this accordingly
function validate_password(password) {
  return true;
}

module.exports = { connect_socket_api };
