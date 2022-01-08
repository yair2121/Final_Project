const { HundredSumModel } = require("../../Tests/Backend/Model/100SumGame");
const { HundredSumView } = require("../../Tests/Backend/View/100SumView");
const { CrosswordModel } = require("./CrosswordModel");
const { CrosswordView } = require("../View/CrosswordView");

games = {};
games["Crossword"] = { model: CrosswordModel, view: CrosswordView };
games["Test Game"] = { model: TestGameModel, view: TestGameView };
module.exports = { games };
