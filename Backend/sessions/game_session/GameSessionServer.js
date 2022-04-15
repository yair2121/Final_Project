const { GameSession } = require("./GameSession");
const EventEmitter = require("events");
class GameSessionServer extends EventEmitter {
  #game_session;
  constructor(session_id, game_model, database_controller) {
    super();
    this.session_id = session_id;
    this.player_ids = [];
    this.connected_players = 0;
    this.#game_session = new GameSession(game_model, database_controller);
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
    this.#game_session.on("Session ended", (game_name) => {
      this.emit("Session ended", game_name, this.session_id);
    });
    this.#game_session.on("Session full", (game_name) => {
      this.emit("Session full", game_name, this.session_id);
      this.start_session();
    });
    this.#game_session.on("Update state", () => {
      console.log("gamesessionserver emitted");
      this.emit("Update session state", this.get_state(), this.session_id);
    });
    this.#game_session.on("Update move", (move_description) => {
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
      this.player_ids.push({ id: player_id, name: player_name });
      this.#game_session.add_player(player_id);
      this.connected_players++;
    } catch (error) {
      this.player_ids.pop();
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
    tmp = this.player_ids.length;
    this.player_ids = this.player_ids.filter((player) => {
      return player["id"] != id;
    });
    if (this.player_ids.length == tmp) {
      throw "Id not found in the game";
    }
    this.connected_players--;
  }

  /**
   * Upload to the game report to the database.
   * @emits "Session ended"
   */
  close() {
    this.#game_session.close();
  }

  /**
   * @returns The current state of the game.
   */
  get_state() {
    //console.log(this.player_ids);
    // console.log(
    //   Object.assign({}, this.#game_session.get_state(), {
    //     player_ids: this.player_ids,
    //   })
    // );
    return Object.assign({}, this.#game_session.get_state(), {
      player_ids: this.player_ids,
    });
  }

  /**
   * @returns info about the latest executed move.
   */
  get_update() {
    return this.#game_session.get_move();
  }
}

module.exports = { GameSessionServer };
