const clg = require("crossword-layout-generator");
const clue_pool = require("./CrosswordCluePool.json");
const samplesize = require("lodash.samplesize");

function create_input_array(difficulty, num_of_words) {
  return samplesize(clue_pool[difficulty], num_of_words);
}

function generate_layout(difficulty, num_of_words) {
  if (difficulty == "test") {
    return generate_testlayout();
  }
  oldlog = console.log;
  //the clg module logs for some reason, disabling logs and reenabling them after function
  console.log = () => {};
  var layout = clg.generateLayout(create_input_array(difficulty, num_of_words));
  console.log = oldlog;
  return layout;
}

function generate_testlayout() {
  oldlog = console.log;
  console.log = () => {};
  test_word_bank = clue_pool[1].slice(0, 5);
  var layout = clg.generateLayout(test_word_bank);
  console.log = oldlog;
  return layout;
}
// function calculate_layout_dimensions(layout) {
//   let num_cols = 0;
//   let num_rows = 0;
//   for (const clue of layout.result) {
//     if (clue.orientation == "across") {
//       num_cols = Math.max(num_cols, clue.startx + clue.answer.length);
//       num_rows = Math.max(num_rows, clue.starty);
//     } else if (clue.orientation == "down") {
//       num_cols = Math.max(num_cols, clue.startx);
//       num_rows = Math.max(num_rows, clue.starty + clue.answer.length);
//     } else {
//       throw "Invalid orientation " + clue.orientation + " in crossword layout";
//     }
//   }
//   return [num_rows, num_cols];
// }
module.exports = generate_layout;
