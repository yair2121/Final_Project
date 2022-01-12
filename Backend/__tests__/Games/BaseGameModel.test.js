// jest.mock("../../Games/BaseGameModel");

const { BaseGameModel } = require("../../Games/BaseGameModel");

let base_game = null;
describe("Test BaseGameModel class", () => {
  beforeEach(() => {
    base_game = new BaseGameModel("mock", 2, 5);
  });

  test("play will throw when called with larger value then max_player_count", () => {
    expect(() => {
      base_game.play(base_game.max_player_count + 1);
    }).toThrow();
  });

  test("play will push the current time to moves when called", () => {
    base_game.play(3);
    expect(base_game.moves[0].Time instanceof Date).toBeTruthy();
  });

  test("play will throw when called with smaller value then min_player_count", () => {
    expect(() => {
      base_game.play(base_game.min_player_count - 1);
    }).toThrow();
  });

  test("log_move will add given move_description to moves when called with move_description", () => {
    base_game.log_move({ mock: "move" });
    expect("move" === base_game.moves.slice(-1)[0].mock).toBeTruthy();
  });

  test("get_move will return a dictionary when called", () => {
    base_game.log_move({ mock: "move" });
    expect(typeof base_game.get_move() === "object").toBeTruthy();
  });
});
