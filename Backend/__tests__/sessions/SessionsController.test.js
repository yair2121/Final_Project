const { GameSession } = require("../../sessions/game_session/GameSession");
const { SessionsController } = require("../../sessions/SessionsController");

let sessions_controller = null;
let session_id1 = null;
let session_id2 = null;
let game_name = "Hundred Sum";
describe("Test SessionController class", () => {
  beforeEach(() => {
    sessions_controller = new SessionsController();
    session_id1 = sessions_controller.connect_player(1, game_name);
    sessions_controller.sessions.unready_sessions[game_name][
      session_id1
    ].add_player(2);
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

  test("connect_player will throw when given game_name that does not exists", () => {
    expect(() => {
      sessions_controller.connect_player(3, "bad name");
    }).toThrow();
  });

  test("Will move unready session to active_session when receive on 'Session started'", () => {
    sessions_controller.sessions.unready_sessions[game_name][
      session_id1
    ].start_session();
    let start_condition = did_session_moved(
      session_id1,
      sessions_controller.sessions.unready_sessions[game_name],
      sessions_controller.sessions.active_sessions[game_name]
    );
    let end_condition = did_session_moved(
      session_id1,
      sessions_controller.sessions.active_sessions[game_name],
      sessions_controller.sessions.unready_sessions[game_name]
    );
    expect(!start_condition && end_condition).toBeTruthy();
  });

  test("Will move full session to active_session when receive on 'Session started'", () => {
    for (let player_id = 0; player_id < 3; player_id++) {
      sessions_controller.sessions.unready_sessions[game_name][
        session_id1
      ].add_player(player_id + 3);
    }
    sessions_controller.sessions.full_sessions[game_name][
      session_id1
    ].start_session();
    let start_condition = did_session_moved(
      session_id1,
      sessions_controller.sessions.full_sessions[game_name],
      sessions_controller.sessions.active_sessions[game_name]
    );
    let end_condition = did_session_moved(
      session_id1,
      sessions_controller.sessions.active_sessions[game_name],
      sessions_controller.sessions.full_sessions[game_name]
    );
    expect(!start_condition && end_condition).toBeTruthy();
  });

  test("Will move unready session to full_session when receive on 'Session full'", () => {
    for (let player_id = 0; player_id < 3; player_id++) {
      sessions_controller.sessions.unready_sessions[game_name][
        session_id1
      ].add_player(player_id + 3);
    }
    const start_condition = did_session_moved(
      session_id1,
      sessions_controller.sessions.unready_sessions[game_name],
      sessions_controller.sessions.full_sessions[game_name]
    );
    const end_condition = did_session_moved(
      session_id1,
      sessions_controller.sessions.full_sessions[game_name],
      sessions_controller.sessions.unready_sessions[game_name]
    );
    expect(!start_condition && end_condition).toBeTruthy();
  });

  test("Will delete a session when receive 'Session ended'", () => {
    sessions_controller.sessions.unready_sessions[game_name][
      session_id1
    ].start_session();
    const session = sessions_controller.sessions.active_sessions[game_name];
    const start_condition = session_id1 in session;
    session[session_id1].close();
    const end_condition = !(session_id1 in session);
    expect(start_condition && end_condition).toBeTruthy();
  });
});

function did_session_moved(session_id, sessions_source, sessions_target) {
  const result =
    session_id in sessions_source && !(session_id in sessions_target);
  return result;
}
