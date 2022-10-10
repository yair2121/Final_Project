//To add games add an entry to the dictionary.
const { CrosswordModel } = require("./Crossword/index");
const games_dict = {};
games_dict["Crossword"] = { model: CrosswordModel };
module.exports = { games_dict };
