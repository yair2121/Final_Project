const BaseGameModel = require("../BaseGameModel").BaseGameModel;
const WINNING_NUMBER = 100;

class HundredSumModel extends BaseGameModel {
  constructor() {
    super("Sum Game", 2, 5);
    // super("Sum Game", 2, 2);
    this.sum = 0;
    this.current_player = 0;
    this.winning_player = null;
  }
  play(number_of_players) {
    super.play(number_of_players);
    this.number_of_players = number_of_players;
  }
  validate_move(move_description) {
    const { number, player } = move_description;
    console.log({
      validation: {
        IsRunning: this.isRunning,
        player: player,
        curplayer: this.current_player,
        number: number,
      },
    });
    return (
      this.isRunning &&
      player === this.current_player &&
      number > 0 &&
      number < 10
    );
  }
  finish_game(move_description) {
    this.winning_player = move_description.player;
    this.isRunning = false;
    super.finish_game(move_description);
  }
  make_move(move_description) {
    console.log("make_move in model");
    if (this.validate_move(move_description)) {
      console.log("valid");
      this.apply_move(move_description);
    }
  }
  apply_move(move_description) {
    const number = parseInt(move_description.number);
    move_description.number = number;
    this.sum += number;
    if (this.sum >= WINNING_NUMBER) {
      this.finish_game(move_description);
    } else {
      this.current_player = (this.current_player + 1) % this.number_of_players;
    }
    this.emit("Move made", move_description);
  }

  get_state() {
    return Object.assign({}, super.get_state(), {
      sum: this.sum,
      player_turn: this.current_player,
      winning_player: this.winning_player,
    });
  }
}

// function run_Test() {
//   var test = new HundredSumModel();
//   test.play(4);
//   player = 0;
//   number = 0;
//   while (test.isRunning) {
//     number = (number + 9) % 10;
//     move = { player: player, number: number };
//     test.make_move(move);
//     player = test.current_player;
//     console.log(test.get_state());
//   }
// }

module.exports = { HundredSumModel };
