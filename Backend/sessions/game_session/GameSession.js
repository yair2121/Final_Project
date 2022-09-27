const EventEmitter = require("events");

/**
 * A game session.
 * Forwards relevant emits from game_model to GameSessionServer
 */
class GameSession extends EventEmitter {
  #game_model;
  constructor(game_model) {
    super();
    // Maps socket_id to player index.  players[<player_socket_id>] = <player_index>
    this.players = {};
    this.connected_players = 0;
    this.#game_model = game_model;
    this.#subscribe_game_model();
  }

  /**
   * Subscribe to emits of #game_model.
   * @emits "Game ended" on #game_model: "Game ended"
   */
  #subscribe_game_model() {
    this.#game_model.on("Game ended", () => {
      this.close();
    });
    this.#game_model.on("Game state updated", () => {
      this.emit("Update state");
    });
    this.#game_model.on("Move made", (move_description) => {
      this.emit("Update move", move_description);
    });
  }

  /**
   * Start the game.
   *
   * @emits "Session started"
   */
  start_session() {
    this.#game_model.play(this.connected_players);
    this.emit("Session started", this.#game_model.game_name);
  }

  /**
   * Validate that given new player can be added to the session.
   * @param {string} id- id for the new player.
   * @throws When id is already exists.
   * @throws When game_model past it's max player_count.
   */
  #validate_add_player(id) {
    if (id in this.players) {
      throw "Id already in the game";
    }
    if (this.#game_model.max_player_count === this.connected_players) {
      throw "Session is already full";
    }
  }

  /**
   * Will add player to the game.
   *
   * @param {string} id- id for the new player.
   * @throws When id is already exists.
   * @throws When game_model past it's max player_count.
   * @emits 'Session full' when session reached it's max_player_counts
   */
  add_player(id) {
    this.#validate_add_player(id);
    this.players[id] = this.connected_players;
    this.connected_players++;
    if (this.connected_players === this.#game_model.max_player_count) {
      this.emit("Session full", this.#game_model.game_name);
    }
  }

  /**
   * Apply given move in game model
   * @param {JSON} move_description- Describe the current move.
   */
  make_move(move_description) {
    this.#game_model.make_move(move_description);
  }

  /**
   * Remove player from the game.
   *
   * @param {number} id- id of the player to remove.
   * @throws When id does not exists.
   */
  remove_player(id) {
    if (id in this.players) {
      delete this.players[id];
      this.connected_players--;
      if (this.connected_players <= 0) {
        this.close();
      }
    } else {
      throw "Id not found in the game";
    }
  }

  /**
   * @emits "Session ended"
   */
  close() {
    this.emit("Session ended", this.#game_model.game_name);
  }

  /**
   * @returns The current state of the game.
   */
  get_state() {
    return this.#game_model.get_state();
  }

  get_game_report() {
    return this.#game_model.get_game_report();
  }
  /**
   * @returns info about the latest executed move.
   */
  get_update() {
    return this.#game_model.get_move();
  }
}

module.exports = { GameSession };
