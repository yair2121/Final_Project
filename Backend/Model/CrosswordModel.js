const IGameModel = require("./IGameModel").IGameModel;

// import IGameModel from "./IGameModel";
// var test = new IGameModel.IGameModel();
class CrosswordModel extends IGameModel {
  constructor() {
    super("Crossword");
  }
  init() {}
  play() {}
  make_move() {}
  close() {}
  get_state() {}
  get_game_report() {}
}
module.exports = { CrosswordModel };
