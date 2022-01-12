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
    if (number_of_players < this.min_player_count) {
      throw "Not enough players";
    }
    this.isRunning = true;
    this.start_date = new Date();
    this.moves.push({ Time: this.start_date });
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
  apply_move(move_description) {
    interface_default();
  }

  /**
   * Will process the given move to fit current game.
   * @param {dictionary} move_description
   */
  process_move(move_description) {
    interface_default();
  }

  /**
   * Will log the given move
   * @param {dictionary} move_description
   */
  log_move(move_description) {
    this.moves.push(Object.assign({}, { Time: new Date() }, move_description));
  }

  finish_game(move_description) {
    this.emit("Game ended");
  }
  /**
   * Will apply given move to the game.
   * @param {dictionary} move_description- Dictionary that hold description of current move,
   */
  make_move(move_description) {
    this.process_move(move_description);
    this.validate_move(move_description);
    this.apply_move(move_description);
    this.log_move(move_description);
  }
  /**
   * @returns Dictionary that hold current state of the game.
   */
  get_state() {
    return { is_running: this.isRunning };
  }

  /**
   * @returns Latest played move.
   */
  get_move() {
    return this.moves.slice(-1)[0];
  }

  /**
   * @returns Dictionary that hold all the moves that have been made till now.
   */
  get_game_report() {
    return Object.assign({}, { moves: this.moves }, this.get_state());
  }
}

module.exports = { BaseGameModel };
