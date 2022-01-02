const { TestGameModel } = require("./TestGameModel");
const { TestGameView } = require("../View/TestGameView");
const { CrosswordModel } = require("./CrosswordModel");
const { CrosswordView } = require("../View/CrosswordView");

games = {};
games["Crossword"] = { model: CrosswordModel, view: CrosswordView };
games["Test Game"] = { model: TestGameModel, view: TestGameView };
module.exports = { games };
