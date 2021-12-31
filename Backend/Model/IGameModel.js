var interface_default =
  require("../interfaceConfig").resolvePrecept("IGameModel");
class IGameModel {
  constructor() {
    this.game_name = "";
  }
  init() {
    interface_default();
  }
  play() {
    interface_default();
  }
  make_move(move_description) {
    interface_default();
  }

  close() {
    interface_default();
  }
  get_state() {
    interface_default();
  }
  get_game_report() {
    interface_default();
  }
}

module.exports = { IGameModel };
