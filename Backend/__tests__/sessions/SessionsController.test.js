const { GameSession } = require("../../sessions/game_session/GameSession");
const { SessionsController } = require("../../sessions/SessionsController");

let sessions_controller = null;
let sessions_id1 = null;
let sessions_id2 = null;
let game_name = "Hundred Sum";
describe("Test SessionController class", () => {
  beforeEach(() => {
    sessions_controller = new SessionsController();
    session_id1 = sessions_controller.connect_player(0, game_name);
  });

  test("close_session will delete session id when given session_id that exists", () => {
    sessions_controller.close_session(game_name, session_id1);
    expect(
      session_id1 in sessions_controller.sessions.unready_sessions[game_name]
    ).toBeFalsy();
  });

  test("close_session will throw when given session_id does not exists", () => {
    expect(() => {
      sessions_controller.close_session(3);
    }).toThrow();
  });

  test("close_session will throw when given game_name does not exists", () => {
    expect(() => {
      sessions_controller.close_session("fake name", sessions_id1);
    }).toThrow();
  });

  test("connect_player will create a new session when given non exist player_id and valid game_name", () => {
    let mock_session_id = sessions_controller.connect_player(2, "Crossword");
    expect(
      mock_session_id in
        sessions_controller.sessions.unready_sessions["Crossword"]
    ).toBeTruthy();
  });

  test("connect_player will add a player to existing session when given non exists player_id and valid game_name", () => {
    const session_id = sessions_controller.connect_player(2, game_name);
    const game_session =
      sessions_controller.sessions.unready_sessions[game_name][session_id];
    expect(2 in game_session.player_ids).toBeTruthy();
  });

  test("connect_player will throw when given game_name does not exists", () => {
    expect(() => {
      sessions_controller.connect_player(3, "bad name");
    }).toThrow();
  });
});
