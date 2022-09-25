const { GameSession } = require("./GameSession");
const EventEmitter = require("events");
/**
 * Encapsulation of GameSession class.
 * Handles communication with sockets of players in the gamesession.
 */
class GameSessionServer extends EventEmitter {
  #game_session;
  #database_controller;
  constructor(session_id, game_model, database_controller) {
    super();
    this.session_id = session_id;
    this.players = [];
    this.connected_players = 0;
    this.#database_controller = database_controller;
    this.#game_session = new GameSession(game_model);
    this.#subscribe_game_session();
  }

  /**
   * Subscribe to emits of #game_session.
   * @emits "Game ended" on #game_session: "Game ended"
   * @emits "Session started" on #game_session: "Session started"
   * @emits 'Session full' when session reached it's max_player_counts
   * @emits 'Session full' when session reached it's max_player_counts
   */
  #subscribe_game_session() {
    this.#game_session.on("Game ended", () => {
      this.emit("Game ended");
    });
    this.#game_session.on("Session started", (game_name) => {
      this.emit(
        "Session started",
        this.get_state(),
        game_name,
        this.session_id
      );
    });
    this.#game_session.on("Session ended", (game_name, s_id) => {
      this.close(game_name, s_id);
    });
    this.#game_session.on("Session full", (game_name) => {
      this.emit("Session full", game_name, this.session_id);
      this.start_session();
    });
    this.#game_session.on("Update state", () => {
      this.emit("Update session state", this.get_state(), this.session_id);
    });
    this.#game_session.on("Update move", (move_description) => {
      // console.log("gamesesssionserver move");
      this.emit("Update session move", move_description, this.session_id);
    });
  }

  /**
   * Start the game.
   *
   * @throws When too many players joined the game.
   * @throws When not enough players joined the game.

   */
  start_session() {
    this.#game_session.start_session();
  }

  /**
   * Will add player to the game.
   *
   * @param {string} id- id for the new player.
   * @throws When id is already exists.
   * @throws When game_model past it's max player_count.
   */
  add_player(player_id, player_name) {
    try {
      this.players.push({ id: player_id, name: player_name });
      this.#game_session.add_player(player_id);
      this.connected_players++;
    } catch (error) {
      this.players.pop();
      throw error;
    }
  }

  /**
   * Apply given move in game session
   * @param {JSON} move_description- Describe the current move.
   */
  make_move(move_description) {
    this.#game_session.make_move(move_description);
  }

  /**
   * Remove player from the game.
   *
   * @param {number} id- id of the player to remove.
   * @throws When id does not exists.
   */
  remove_player(id) {
    this.#game_session.remove_player(id);
    tmp = this.players.length;
    this.players = this.players.filter((player) => {
      return player["id"] != id;
    });
    if (this.players.length == tmp) {
      throw "Id not found in the game";
    }
    this.connected_players--;
  }

  /**
   * @emits "Session ended"
   */
  close(game_name) {
    this.#database_controller
      .insertOne({
        id: this.session_id,
        report: this.#game_session.get_game_report(),
      })
      .then(this.emit("Session ended", game_name, this.session_id));
  }

  /**
   * @returns The current state of the game.
   */
  get_state() {
    return Object.assign({}, this.#game_session.get_state(), {
      players: this.players,
    });
  }

  /**
   * @returns info about the latest executed move.
   */
  get_update() {
    return this.#game_session.get_move();
  }

  /**
   * @returns info about the latest executed move.
   */
  get_game_report() {
    return this.#game_session.get_game_report();
  }
}

module.exports = { GameSessionServer };
