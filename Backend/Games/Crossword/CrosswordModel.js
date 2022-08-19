// TODO: tests.

const BaseGameModel = require("../BaseGameModel").BaseGameModel;
const generate_layout = require("./CrosswordGenerator");
const NUM_OF_CLUES = 5;
class CrosswordModel extends BaseGameModel {
  constructor(difficulty = 1) {
    super("Crossword", 1, 4);
    let layout = generate_layout(difficulty, NUM_OF_CLUES);
    this.cols = layout.cols;
    this.rows = layout.rows;
    this.layout = layout.result;
    this.empty_layout = this.layout.map(({ answer, ...item }) => item);
    this.current_boardstate = layout.table;
    // remove letters from the table so we have an empty board to start with. black squares are '-' white squares are ' '
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.current_boardstate[i][j] != "-") {
          this.current_boardstate[i][j] = " ";
        }
      }
    }

    this.claims_by_position = new Array(this.layout.length).fill(-1);
    this.num_of_clues = this.layout.length;
    this.claims_by_player = [];
  }
  play(number_of_players) {
    super.play(number_of_players);
    this.number_of_players = number_of_players;
    this.claims_by_player = new Array(number_of_players).fill(-1);
  }
  // move_description = {type="claim"/"release"/"move", body=parameters of action}
  make_move(move_description) {
    console.log("make_move in model");
    let { type, body } = move_description;
    if (type == "move") {
      if (this.validate_move(body)) {
        console.log("valid");
        this.apply_move(body);
      }
    } else if (type == "claim") {
      this.claim_clue_by_position(body);
    } else if (type == "release") {
      this.release_claim(body);
    }
  }
  // Lock a clue's row/column for a certain player (by position as defined in crosswordgenerator)
  // Checks if player and position are both valid. If so, releases previous claim of player and checks
  // if the requested position is available. If so, locks it for the player.
  // Returns the claimed position, or -1 if failed for any reason.
  // TODO: research if need to add mutexes here! (probably not)
  claim_clue_by_position(claim_description) {
    let { position, player } = claim_description;
    position--;
    if (
      this.claims_by_player.length > player &&
      position < this.num_of_clues &&
      position >= 0 &&
      player >= 0
    ) {
      let previous_claim = this.claims_by_player[player];
      if (previous_claim >= 0) {
        this.claims_by_position[previous_claim] = -1;
        this.claims_by_player[player] = -1;
      }
      if (this.claims_by_position[position] == -1) {
        this.claims_by_position[position] = player;
        this.claims_by_player[player] = position;
        return position + 1;
      }
    }
    return -1;
  }

  // Gets index of player and releases associated claim.
  release_claim(player) {
    if (this.claims_by_player.length > player && player >= 0) {
      let previous_claim = this.claims_by_player[player];
      if (previous_claim >= 0) {
        this.claims_by_position[previous_claim] = -1;
        this.claims_by_player[player] = -1;
      }
    }
  }

  //Checks if a move is valid (i.e word is claimed by player)
  validate_move(move_description) {
    let { letter, position, index, player } = move_description;
    position--;
    return (
      this.claims_by_position[position] == player &&
      index >= 0 &&
      index < this.layout[position].clue.length
    );
  }

  // Given clue position and index of letter in clue,
  // returns the coordinates of the letter on the board.
  position_index_to_coords(position, index) {
    if (position > 0 && position <= this.num_of_clues) {
      let clue = this.layout[position - 1];
      if (index < clue.answer.length && index >= 0) {
        if (clue.orientation == "down") {
          return [clue.startx, clue.starty + index];
        } else if (clue.orientation == "across") {
          return [clue.startx + index, clue.starty];
        }
        return clue.orientation;
      }
    }
    return [-1, -1];
  }

  //Calls validate_move. If the move is valid, applies move (puts letter into cell)
  apply_move(move_description) {
    if (this.validate_move(move_description)) {
      const { letter, position, index, player } = move_description;
      let coords = this.position_index_to_coords(position, index);
      this.current_boardstate[coords[0]][coords[1]] = letter;
      this.emit("Move made", move_description);
    }
  }
  get_state() {
    return Object.assign({}, super.get_state(), {
      claims_by_player: this.claims_by_player,
      claims_by_position: this.claims_by_position,
      board: this.current_boardstate,
    });
  }
  // TODO: this and everything under this
  get_game_report() {}
}
module.exports = { CrosswordModel };
