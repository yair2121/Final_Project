const { HundredSumModel } = require("./SumGame/index");
const { CrosswordModel } = require("./Crossword/index");
const games_dict = {};
games_dict["Crossword"] = { model: CrosswordModel };
games_dict["Sum Game"] = { model: HundredSumModel };
module.exports = { games_dict };
