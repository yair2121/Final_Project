jest.mock("../../Games/BaseGameModel");
const { BaseGameModel } = require("../../Games/BaseGameModel");

describe("Test BaseGameModel class", () => {
  beforeEach(() => {
    const base_game = new BaseGameModel("mock", 2, 5);
  });
  test("play will throw when called with large value then max_player_count", () => {
    expect(() => {
      base_game.play(base_game.max_player_count + 1);
    }).toThrow();
  });
  test("play will throw when called with smaller value then min_player_count", () => {
    expect(() => {
      base_game.play(base_game.max_player_count - 1);
    }).toThrow();
  });
});
