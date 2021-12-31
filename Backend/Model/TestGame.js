const { IGameModel } = require("./IGameModel");
const WINNING_NUMBER = 100;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class TestGame extends IGameModel {
  constructor() {
    super();
    this.game_name = "Test Game";
  }
  init(number_of_players) {
    this.sum = 0;
    this.moves = [];
    this.number_of_players = number_of_players;
    this.current_player = 0;
    this.isRunning = true;
    this.winning_player = 0;
  }
  make_move(move) {
    const { player, number } = move;
    if (this.isRunning && player === this.current_player) {
      if (number > 0 && number < 10) {
        this.sum += number;
        this.moves.push({
          player: this.current_player,
          move: number,
          current_sum: this.sum,
        });
        if (this.sum >= WINNING_NUMBER) {
          this.winning_player = this.current_player;
          this.isRunning = false;
        } else {
          this.current_player =
            (this.current_player + 1) % this.number_of_players;
        }
      }
    }
  }
  get_state() {
    return {
      sum: this.sum,
      player_turn: this.current_player,
      is_done: this.isRunning,
      winning_player: this.winning_player,
    };
  }
  get_game_report() {
    return { moves: this.moves, ...this.get_state() };
  }
}

var test = new TestGame();
test.init();
player = 0;
number = 0;
while (test.isRunning) {
  number += 9;
  move = { player: player, move: number };
  test.make_move(move);
  player = (player + 1) % test.number_of_players;
  console.log(test.get_state());
}
console.log(test.get_game_report());
module.exports = { TestGame };
