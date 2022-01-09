const { v1: uuidv1 } = require("uuid");
/**
 * A game session.
 */
class GameSession {
  constructor(game_model, database_controller) {
    this.session_id = uuidv1();
    this.player_ids = {};
    this.connected_players = 0;
    this.game_model = game_model;
    this.database_controller = database_controller;
  }
  /**
   * Start the game.
   *
   * @throws When not enough player join the game.
   */
  start_session() {
    this.game_model.play(this.connected_players); // TODO: may throw exception- not sure if this class will take care of it or the wrapper server.
  }

  /**
   * Add player to the game.
   *
   * @param {number} id- id for the new player.
   * @throws When id is already exists.
   */
  add_player(id) {
    if (!(id in this.player_ids)) {
      this.player_ids[id] = this.connected_players;
      this.connected_players++;
    } else {
      throw "Id already in the game";
    }
  }

  /**
   * Apply given move in game model
   * @param {JSON} move_description- Describe the current move.
   */
  make_move(move_description) {
    this.game_model.make_move(JSON.parse(move_description));
  }

  /**
   * Remove player from the game.
   *
   * @param {number} id- id of the player to remove.
   * @throws When id does not exists.
   */
  remove_player(id) {
    if (id in this.player_ids) {
      delete this.player_ids[id];
      this.connected_players--;
    } else {
      throw "Id not found in the game";
    }
  }

  /**
   * Upload to the game report to the database.
   */
  close() {
    //TODO: implement this and database implementation
  }

  /**
   * @returns The current state of the game.
   */
  get_state() {
    return this.game_model.get_state();
  }

  /**
   * @returns info about the latest executed move.
   */
  get_update() {
    return this.game_model.get_move();
  }
}

module.exports = { GameSession };
