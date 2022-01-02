var interface_default =
  require("../interfaceConfig").resolvePrecept("IGameModel");
class IGameModel {
  //TODO: Reconsider to change it to not be interface
  constructor(game_name, min_player_count, max_player_count) {
    this.game_name = game_name;
    this.max_player_count = max_player_count;
    this.min_player_count = min_player_count;
  }

  init() {
    //TODO: Reconsider to move this to constructor
    interface_default();
  }

  play(number_of_players) {
    interface_default();
  }

  make_move(move_description) {
    interface_default();
  }

  get_state() {
    interface_default();
  }

  get_game_report() {
    interface_default();
  }
}

module.exports = { IGameModel };
