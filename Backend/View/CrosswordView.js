const { BaseSessionView } = require("./BaseSessionView");
class CrosswordView extends BaseSessionView {
  constructor() {
    super();
  }
  proccess_state(game_state) {
    console.log("Proccess the game state");
  }
}
module.exports = { CrosswordView };
