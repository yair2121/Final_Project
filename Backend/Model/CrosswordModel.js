const BaseGameModel = require("./BaseGameModel").BaseGameModel;
class CrosswordModel extends BaseGameModel {
  constructor() {
    super("Crossword");
  }
  play(number_of_players) {}
  make_move() {}
  get_state() {}
  get_game_report() {}
}
module.exports = { CrosswordModel };
