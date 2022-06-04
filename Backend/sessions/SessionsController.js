const EventEmitter = require("events");
const { games_dict } = require("../Games/Games_Dictionary");
const {
  GameSessionServer,
} = require("../sessions/game_session/GameSessionServer");
const { v1: uuidv1 } = require("uuid");
/**
 * Manage games sessions and connection between the client to them.
 */
class SessionsController extends EventEmitter {
  constructor() {
    super();
    this.sessions = {
      unready_sessions: {},
      full_sessions: {},
      active_sessions: {},
    };
    for (let game_name in games_dict) {
      this.sessions.unready_sessions[game_name] = {};
      this.sessions.full_sessions[game_name] = {};
      this.sessions.active_sessions[game_name] = {};
    }
  }

  /**
   * Get Session of given session id.
   * @param {string} session_id.
   * @returns TODO: return socket io for the client.
   * @throws When session_id does not exist.
   * @throws When game_name does not exist.
   */
  #get_session(game_name, session_id) {
    if (!(game_name in games_dict)) {
      throw game_name + " game does not exist";
    }
    let container = null;
    let session = null;
    if (session_id in this.sessions.unready_sessions[game_name]) {
      container = this.sessions.unready_sessions;
      session = this.sessions.unready_sessions[game_name][session_id];
    } else if (session_id in this.sessions.full_sessions[game_name]) {
      container = this.sessions.full_sessions;
      session = this.sessions.full_sessions[game_name][session_id];
    } else if (session_id in this.sessions.active_sessions[game_name]) {
      container = this.sessions.active_sessions;
      session = this.sessions.active_sessions[game_name][session_id];
    }
    if (container === null) {
      // throw (session_id, this.sessions);
      throw "session_id does not exist";
    }
    return {
      container: container,
      session: session,
    };
  }

  /**
   * Make move in specific session.
   * @param {string} game_name
   * @param {string} session_id
   * @throws When session_id does not exist.
   * @throws When game_name does not exist.
   */
  make_move(game_name, session_id, move_description) {
    this.#get_session(game_name, session_id).session.make_move(
      move_description
    );
  }

  /**
   * Close session of given session id.
   * @param {string} session_id.
   * @throws When session_id does not exist.
   * @throws When game_name does not exist.
   */
  close_session(game_name, session_id) {
    const { container } = this.#get_session(game_name, session_id);
    delete container[game_name][session_id];
  }
  /**
   * Validate that given player request can be given.
   * @param {string} player_id- id of player.
   * @param {string} game_name- name of the game to connect the player.
   * @throws When game_name does not exist.
   */
  #validate_connect_player(player_id, game_name) {
    if (!(game_name in games_dict)) {
      throw game_name + " game does not exist";
    }
  }

  /**
   * Add given player id to available game, will create a new session if necessary.
   * @param {string} player_id- id of player.
   * @param {string} game_name- name of the game to connect the player.
   * @returns Socket io for the player to connect to. //TODO: return socket io
   * @throws When game_name does not exist.
   */
  connect_player(player_id, player_name, game_name) {
    this.#validate_connect_player(player_id, game_name);
    const relevant_sessions = this.sessions.unready_sessions[game_name];
    for (const session_id in relevant_sessions) {
      // Try to add player to session
      try {
        relevant_sessions[session_id].add_player(player_id, player_name);
        return session_id;
      } catch (error) {
        console.log(error);
      }
    }
    const session_id = this.#create_session(game_name); // Create new session because relevant session does not exist
    this.sessions.unready_sessions[game_name][session_id].add_player(
      player_id,
      player_name
    );
    return session_id;
  }

  connect_to_session(player_id, player_name, session_id) {
    if (session_id in unready_sessions) {
      try {
        unready_sessions[session_id].add_player(player_id, player_name);
        return session_id;
      } catch (error) {
        console.log(error);
      }
    }
    return -1;
  }

  #subscribe_game_session(game_session) {
    game_session.on("Session started", (game_state, game_name, session_id) => {
      const { container, session } = this.#get_session(game_name, session_id);
      this.sessions.active_sessions[game_name][session_id] = session;
      delete container[game_name][session_id];
      this.emit("Session started", game_state, session_id);
    });

    game_session.on("Session full", (game_name, session_id) => {
      this.sessions.full_sessions[game_name][session_id] =
        this.sessions.unready_sessions[game_name][session_id];
      delete this.sessions.unready_sessions[game_name][session_id];
    });

    game_session.on("Session ended", (game_name, session_id) => {
      this.close_session(game_name, session_id);
      this.emit("Session ended", session_id);
    });

    game_session.on("Update session state", (game_state, session_id) => {
      console.log("sessionscontroller emitted");
      this.emit("Update session state", game_state, session_id);
    });

    game_session.on("Update session move", (move_description, session_id) => {
      console.log("sessionscontroller move");
      this.emit("Update session move", move_description, session_id);
    });
  }
  /**
   * Create a new game session of game_name.
   * @param {string} game_name-  Create new session of game_name.
   * @returns session id of the created game session.
   */
  #create_session(game_name) {
    const database = null; //TODO: implement this
    const session_id = uuidv1();
    const { model } = games_dict[game_name];
    const game_session = new GameSessionServer(
      session_id,
      new model(),
      database
    );
    this.#subscribe_game_session(game_session);
    this.sessions.unready_sessions[game_name][session_id] = game_session;
    return session_id;
  }
}

module.exports = { SessionsController };
