var interface_default =
  require("../interfaceConfig").resolvePrecept("BaseSessionView");
class BaseSessionView {
  constructor() {}
  show_state(game_state) {
    // TODO: need to implement this
  }
  proccess_state(game_state) {
    interface_default();
  }
}

module.exports = { BaseSessionView };
