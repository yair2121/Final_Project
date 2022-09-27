const interface_default =
  require("../interfaceConfig").resolvePrecept("BaseGameModel");
const EventEmitter = require("events");

/**
 * Base class for games models.
 */
class BaseGameModel extends EventEmitter {
  constructor(game_name, min_player_count, max_player_count) {
    super();
    this.game_name = game_name;
    this.max_player_count = max_player_count;
    this.min_player_count = min_player_count;
    this.moves = [];
    this.isRunning = false;
    this.start_date = null;
  }

  /**
   *
   * @param {number} number_of_players- Fixed number of players in game.
   * @throws When number_of_players larger then max_player_count.
   * @throws When number_of_players smaller then min_player_count.
   */
  play(number_of_players) {
    if (number_of_players > this.max_player_count) {
      throw "Too many players";
    }
    // if (number_of_players < this.min_player_count) {
    //   throw "Not enough players";
    // }
    this.isRunning = true;
    this.start_date = Date.now();
    // this.moves.push({ Time: this.start_date });
  }

  /**
   * Will validate that given move abide to the game rules and current state.
   * @param {dictionary} move_description
   */
  validate_move(move_description) {
    interface_default();
  }

  /**
   * Will apply given move to the current state of the game.
   * @param {dictionary} move_description
   */
  make_move(move_description) {
    interface_default();
  }

  /**
   * Logs entry to future game_report
   * @param {dictionary} entry
   */
  log(entry) {
    this.moves.push(Object.assign({}, { Time: new Date() }, entry));
  }

  /**
   * Update the game state to represent that the game ended.
   * @emits "Game ended"
   * @param {dictionary} move_description
   */
  finish_game(move_description) {
    this.emit("Game ended");
  }

  /**
   * @returns Dictionary that hold current state of the game.
   */
  get_state() {
    return { is_running: this.isRunning };
  }

  /**
   * @returns Dictionary that hold all the moves that have been made till now.
   */
  get_game_report() {
    return Object.assign({}, { moves: this.moves }, this.get_state());
  }
}

module.exports = { BaseGameModel };
