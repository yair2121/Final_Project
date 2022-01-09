const { SessionsController } = require("../../sessions/SessionsController");

let sessions_controller = null;
describe("Test get session id from Sessions controller", () => {
  beforeEach(() => {
    sessions_controller = new SessionsController();
  });
  it("Should return session controller instance", () => {
    let session_id = sessions_controller.create_session("Crossword");
    expect(session_id in sessions_controller.game_sessions).toBeTruthy();
  });
});
