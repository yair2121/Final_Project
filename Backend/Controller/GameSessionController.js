class GameSessionController {
  constructor(game_model, database_controller, session_view) {
    this.session_id = Math.floor(Math.random() * 1000);
    this.player_ids = {};
    this.connected_players = 0;
    this.game_Model = game_model;
    this.database_controller = database_controller;
    this.session_view = session_view;
  }
  start_session() {
    this.game_Model.play(this.connected_players); // TODO: number of players is predefined
  }
  add_player(id) {
    if (!(id in this.player_ids)) {
      this.player_ids[this.connected_players] = id;
      this.connected_players++;
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
  send_state() {
    //TODO: implement this
    return this.session_view.show_state(this.game_Model.get_state()); //TODO: Not sure yet how this will be implemented.
  }
}

module.exports = { GameSessionController };
