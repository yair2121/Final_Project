const { HundredSumModel, HundredSumView } = require("./SumGame/index");
const { CrosswordModel, CrosswordView } = require("./Crossword/index");
const games_dict = {};
games_dict["Crossword"] = { model: CrosswordModel, view: CrosswordView };
games_dict["Hundred Sum"] = { model: HundredSumModel, view: HundredSumView };
module.exports = { games_dict };
