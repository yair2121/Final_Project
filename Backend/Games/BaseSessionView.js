var interface_default =
  require("../interfaceConfig").resolvePrecept("BaseSessionView");
class BaseSessionView {
  constructor() {}
  show_state(game_state) {
    return this.proccess_state(game_state);
    // TODO: need to implement this
  }
  proccess_state(game_state) {
    return JSON.stringify(game_state); // TODO: Not sure if it will be this simple
    // interface_default();
  }
}

module.exports = { BaseSessionView };
