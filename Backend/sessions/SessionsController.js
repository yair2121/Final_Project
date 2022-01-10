const { games_dict } = require("../Games/Games_Dictionary");
const { GameSession } = require("../sessions/game_session/GameSession"); // TODO: replace with GameSessionServer when the class is ready
const { v1: uuidv1 } = require("uuid");

/**
 * Manage games sessions and connection between the client to them.
 */
class SessionsController {
  constructor() {
    this.game_sessions = {};
  }

  /**
   * Get Session of given session id.
   * @param {string} session_id.
   * @returns TODO: return socket io for the client.
   * @throws When session_id does not exist.
   */
  #get_session(session_id) {
    if (session_id in this.game_sessions) {
      return this.game_sessions[session_id];
    } else {
      throw "session_id does not exist";
    }
  }
  /**
   * Close session of given session id.
   * @param {string} session_id
   * @throws When session_id does not exist.
   */
  close_session(session_id) {
    this.#get_session(session_id).close();
    delete this.game_sessions[session_id];
  }
  /**
   * Validate that given player request can be given.
   * @param {string} player_id- id of player.
   * @param {string} game_name- name of the game to connect the player.
   * @throws When game_name does not exist.
   * @throws When player_id in existing session.
   */
  #validate_connect_player(player_id, game_name) {
    if (!(game_name in games_dict)) {
      throw "game does not exist";
    }
    for (const [session_id, session] of Object.entries(this.game_sessions)) {
      if (player_id in session.player_ids) {
        throw "Player already in session" + session.session_id;
      }
    }
  }

  #get_sessions_of_game(game_name) {
    if (Object.keys(this.game_sessions).length === 0) {
      return this.game_sessions;
    }
    return Object.keys(this.game_sessions).reduce(
      (session) => session.game_model.game_name === game_name
    );
  }
  /**
   * Add given player id to available game, will create a new session if necessary.
   * @param {string} player_id- id of player.
   * @param {string} game_name- name of the game to connect the player.
   * @returns Socket io for the player to connect to.
   * @throws When game_name does not exist.
   * @throws When player id exists in active session.
   */
  connect_player(player_id, game_name) {
    this.#validate_connect_player(player_id, game_name);
    let relevant_sessions = this.#get_sessions_of_game(game_name);
    for (const [session_id, session] of Object.entries(this.game_sessions)) {
      // Try to find a relevant session
      try {
        session.add_player(player_id); // Will throw "Session already full" if session is full.
        return session_id;
        break;
      } catch (error) {}
    }
    let session_id = this.#create_session(game_name); // Create new session because relevant session does not exist
    this.game_sessions[session_id].add_player(player_id);
    return session_id;
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
    this.game_sessions[session_id] = new GameSession(
      session_id,
      new model(game_name),
      database
    );
    return session_id;
  }
}

module.exports = { SessionsController };
