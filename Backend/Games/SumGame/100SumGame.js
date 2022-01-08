const BaseGameModel = require("../BaseGameModel").BaseGameModel;
const WINNING_NUMBER = 100;

class HundredSumModel extends BaseGameModel {
  constructor() {
    super("Hundred game", 2, 5);
    this.sum = 0;
    this.moves = [];
    this.current_player = 0;
    this.isRunning = false;
    this.winning_player = 0;
  }
  play(number_of_players) {
    super.play(number_of_players);
    this.number_of_players = number_of_players;
    this.isRunning = true;
  }
  is_valid_move(move) {
    const { number, player } = move;
    return (
      this.isRunning &&
      player === this.current_player &&
      number > 0 &&
      number < 10
    );
  }
  apply_move(move) {
    const number = move.number;
    this.sum += number;
    this.moves.push({
      player: this.current_player,
      move: number,
      current_sum: this.sum,
    });
  }
  make_move(move) {
    if (this.is_valid_move(move)) {
      this.apply_move(move);
      if (this.sum >= WINNING_NUMBER) {
        this.winning_player = move.player;
        this.isRunning = false;
      } else {
        this.current_player =
          (this.current_player + 1) % this.number_of_players;
      }
    }
  }
  get_state() {
    return {
      sum: this.sum,
      player_turn: this.current_player,
      is_running: this.isRunning,
      winning_player: this.winning_player,
    };
  }
  get_game_report() {
    return { moves: this.moves, ...this.get_state() };
  }
}

function run_Test() {
  var test = new HundredSumModel();
  test.play(4);
  player = 0;
  number = 0;
  while (test.isRunning) {
    number = (number + 9) % 10;
    move = { player: player, number: number };
    test.make_move(move);
    player = test.current_player;
    console.log(test.get_state());
  }
}
run_Test();
module.exports = { HundredSumModel };
