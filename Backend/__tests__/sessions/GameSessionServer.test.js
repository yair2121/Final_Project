const {
  GameSessionServer,
} = require("../../sessions/game_session/GameSessionServer");
const { BaseGameModel } = require("../../Games/BaseGameModel");
let mock_move = { moving: "move", doing: "nothing" };

const mock_game = new BaseGameModel("mock_game", 2, 4);
jest.spyOn(mock_game, "make_move").mockImplementation(() => {});

let game_session = null;
describe("Test GameSessionServer class", () => {
  beforeEach(() => {
    game_session = new GameSessionServer("0", mock_game, null);
    game_session.add_player(0);
    game_session.add_player(1);
    game_session.add_player(2);
  });

  test("make_move will apply move in game model when called with a JSON dictionary", () => {
    game_session.make_move(JSON.stringify(mock_move));
    expect(mock_game.make_move).toHaveBeenCalledWith(mock_move);
  });
  test("Will emit 'Game ended' when game_model finish the game", () => {
    let emitted = false;
    game_session.on("Game ended", () => {
      emitted = true;
    });
    mock_game.finish_game();
    expect(emitted).toBeTruthy();
  });
  test("Will emit 'Game ended' when game_model finish the game", () => {
    let emitted = false;
    game_session.on("Game ended", () => {
      emitted = true;
    });
    mock_game.finish_game();
    expect(emitted).toBeTruthy();
  });
  test("Will emit 'Session full' when final player added to session", () => {
    let emitted = false;
    game_session.on("Session full", () => {
      emitted = true;
    });
    game_session.add_player(3);
    expect(emitted).toBeTruthy();
  });
  test("Will emit 'Session started' when start_session is called", () => {
    let emitted = false;
    game_session.on("Session started", () => {
      emitted = true;
    });
    game_session.start_session();
    expect(emitted).toBeTruthy();
  });
});
