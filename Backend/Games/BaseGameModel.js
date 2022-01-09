var interface_default =
  require("../interfaceConfig").resolvePrecept("IGameModel");
class BaseGameModel {
  constructor(game_name, min_player_count, max_player_count) {
    this.game_name = game_name;
    this.max_player_count = max_player_count;
    this.min_player_count = min_player_count;
  }

  play(number_of_players) {
    if (
      number_of_players > this.max_player_count ||
      number_of_players < this.min_player_count
    ) {
      throw "Incorrect number of players";
    }
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

module.exports = { BaseGameModel };
