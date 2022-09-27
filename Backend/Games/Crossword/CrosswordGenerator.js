const clg = require("crossword-layout-generator");
const clue_pool = require("./CrosswordCluePool.json");
const samplesize = require("lodash.samplesize");
const sample = require("lodash.sample");
const deepcopy = require("lodash.clonedeep");

//Samples num_of_words words from clue_pool[difficulty]
function create_input_array(difficulty, num_of_words) {
  words = samplesize(clue_pool[difficulty], num_of_words);
  // Copying words before changing them so original JSON does not change.
  words_copy = deepcopy(words);
  for (const word of words_copy) {
    word.clue = sample(word.clues);
    if (word.clue === undefined) {
      throw word;
    }
    delete word.clues;
  }
  return words_copy;
}

function generate_layout(difficulty = 1, num_of_words = 50) {
  oldlog = console.log;
  //the clg module logs for some reason, disabling logs and reenabling them after function
  console.log = () => {};
  var layout = clg.generateLayout(create_input_array(difficulty, num_of_words));
  console.log = oldlog;
  return layout;
}

module.exports = generate_layout;
