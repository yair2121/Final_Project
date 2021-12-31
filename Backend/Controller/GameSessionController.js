class GameSessionController {
  constructor(game_model, database_controller, session_view) {
    this.session_id = Math.floor(Math.random() * 1000);
    this.player_ids = [];
    this.game_Model = game_model;
    this.database_controller = database_controller;
    this.session_view = session_view;
  }
  start_session() {
    //TODO: implement this
  }
  add_player(id) {
    if (!this.player_ids.includes(id)) {
      this.player_ids.push(id);
    }
  }
  remove_player(id) {
    //TODO: implement this
    if (this.player_ids.includes(id)) {
      this.player_ids.splice(array.indexOf(id), 1);
    }
  }
  close() {
    //TODO: implement this
  }
  show_state() {
    //TODO: implement this
    this.session_view.show_state();
  }
}

module.exports = { GameSessionController };
