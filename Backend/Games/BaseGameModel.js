var interface_default =
  require("../interfaceConfig").resolvePrecept("BaseGameModel");

/**
 * Base class for games models.
 */
class BaseGameModel {
  constructor(game_name, min_player_count, max_player_count) {
    this.game_name = game_name;
    this.max_player_count = max_player_count;
    this.min_player_count = min_player_count;
  }
  /**
   *
   * @param {number} number_of_players- Fixed number of players in game.
   * @throws When number_of_players not in range of game accepted range
   */
  play(number_of_players) {
    if (
      number_of_players > this.max_player_count ||
      number_of_players < this.min_player_count
    ) {
      throw "Incorrect number of players";
    }
  }
  /**
   * Apply given move to the game
   * @param {dictionary} move_description- Dictionary that hold description of current move,
   */
  make_move(move_description) {
    interface_default();
  }
  /**
   * @returns Dictionary that hold current state of the game.
   */
  get_state() {
    interface_default();
  }
  /**
   * @returns Dictionary that hold all the moves that have been made till now.
   */
  get_game_report() {
    interface_default();
  }
}

module.exports = { BaseGameModel };
