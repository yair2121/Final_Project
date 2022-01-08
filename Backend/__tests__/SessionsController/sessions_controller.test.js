const { SessionsController } = require("../../Controller/SessionsController");

const game_name_mock = "Crossword";

describe("Test get session id from Sessions controller", () => {
  const sessions_controller_mock = null;

  beforeEach(() => {
    sessions_controller_mock = new SessionsController();
  });
  it("Should return session controller instance", () => {
    const session1_id = sessions_controller_mock.create_session(game_name_mock);
    // const session2_id = sessions_controller_mock.create_session("Crossword");
    // const session3_id = sessions_controller_mock.create_session("Crossword");
    const session = sessions_controller_mock.get_session(session1_id);
    expect(session.game_Model.game_name).toBe(game_name_mock);
  });
});
