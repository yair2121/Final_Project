const {
  HundredSumModel,
} = require("../../Tests/Backend/Model/tests_games/100SumGame");
const { HundredSumView } = require("../../Tests/Backend/View/100SumView");
const { CrosswordModel } = require("./CrosswordModel");
const { CrosswordView } = require("../View/CrosswordView");

const games = {};
games["Crossword"] = { model: CrosswordModel, view: CrosswordView };
games["Hundred Sum"] = { model: HundredSumModel, view: HundredSumView };
module.exports = { games };
