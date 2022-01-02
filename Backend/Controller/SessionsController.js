const { games } = require("../Model/Games");

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
      this.game_sessions[session_id].close(); //TODO: This may be unneccessery.
      delete this.game_sessions[session_id];
    }
  }
  connect_player(player_id, game_name) {
    //TODO: implement this
  }
  create_session(game_name) {
    this.session_id = undefined;
    if (game_name in games) {
      database = undefined; //TODO: implement this
      session_id = this.session_id = Math.floor(Math.random() * 1000);
      const { model, view } = this.games[game_name];
      this.game_sessions[this.session_id] = new GameSessionController(
        new model(game_name),
        database,
        new view()
      );
    }
    return this.session_id;
  }
}

module.exports = { SessionsController };
