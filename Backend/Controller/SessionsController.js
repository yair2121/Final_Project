const { games_dict } = require("../Games/Games_Dictionary");
const {
  GameSessionController,
} = require("../Controller/GameSessionController");

//TODO: Change to service instead of controller
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
      delete this.game_sessions[session_id];
    }
  }
  connect_player(player_id, game_name) {
    //TODO: implement this
  }
  create_session(game_name) {
    //TODO: Crush
    let session_id = null;
    if (game_name in games_dict) {
      const database = null; //TODO: implement this
      session_id = session_id = Math.floor(Math.random() * 10000); //TODO: Replace with uuid.
      const { model, view } = games_dict[game_name];
      this.game_sessions[session_id] = new GameSessionController(
        new model(game_name),
        database,
        new view()
      );
    }
    return session_id;
  }
}

module.exports = { SessionsController };
