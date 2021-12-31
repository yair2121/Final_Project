class SessionsController {
  constructor() {
    this.game_sessions = {};
  }
  get_session(session_id) {
    if (session_id in this.game_sessions) {
      return this.game_sessions[session_id];
    }
    return;
  }
  close_session(session_id) {
    //TODO: implement this
    if (session_id in this.game_sessions) {
      this.game_sessions[session_id].close();
    }
  }
  connect_player(player_id, game_name) {
    //TODO: implement this
  }
  create_session(game_name) {
    //TODO: implement this
  }
}

module.exports = { SessionsController };
