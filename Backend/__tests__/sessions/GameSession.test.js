const { GameSession } = require("../../sessions/game_session/GameSession");
const { BaseGameModel } = require("../../Games/BaseGameModel");

let mock_move = { moving: "move", doing: "nothing" };

const mock_game = new BaseGameModel("mock_game", 2, 4);
jest.spyOn(mock_game, "make_move").mockImplementation(() => {});

let game_session = null;
describe("Test GameSession class", () => {
  beforeEach(() => {
    game_session = new GameSession("0", mock_game, null);
    game_session.add_player(0);
    game_session.add_player(1);
    game_session.add_player(2);
  });

  test("add_player will increase player count when a new player is added", () => {
    let correct_player_count = game_session.connected_players + 1;
    game_session.add_player(4);
    expect(game_session.connected_players).toBe(correct_player_count);
  });

  test("add_player will add a new player to player_ids when called with a new id", () => {
    game_session.add_player(4);
    expect(4 in game_session.player_ids).toBeTruthy();
  });

  test("add_player will throw exception when game_model reached max players", () => {
    game_session.add_player(3);
    expect(() => {
      game_session.add_player(5);
    }).toThrow();
  });

  test("add_player will throw exception when called with a existing id", () => {
    expect(() => {
      game_session.add_player(1);
    }).toThrow();
  });

  test("remove_player will decrease the player count by one when called with existing id", () => {
    let current_player_count = game_session.connected_players - 1;
    game_session.remove_player(0);
    expect(game_session.connected_players).toBe(current_player_count);
  });

  test("remove_player will remove a player from player_ids when called with existing id", () => {
    game_session.remove_player(0);
    expect(0 in game_session.player_ids).toBeFalsy();
  });

  test("remove_player will throw exception when called with a existing id", () => {
    expect(() => {
      game_session.remove_player(5);
    }).toThrow();
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
});
