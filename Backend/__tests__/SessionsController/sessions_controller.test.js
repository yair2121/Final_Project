const { SessionsController } = require("../../Controller/SessionsController");

const session_id = null;
let sessions_controller_mock = null;
describe("Test get session id from Sessions controller", () => {
  beforeEach(() => {
    sessions_controller_mock = new SessionsController();
  });
  it("Should return session controller instance", () => {
    let session_id = sessions_controller_mock.create_session("Crossword");
    expect(session_id in sessions_controller_mock.game_sessions).toBeTruthy();
  });
});
