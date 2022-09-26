const BaseGameModel = require("../BaseGameModel").BaseGameModel;
const generate_layout = require("./CrosswordGenerator");
class CrosswordModel extends BaseGameModel {
  static NUM_OF_CLUES = 30;
  static DIFFICULTY = 1;
  constructor() {
    super("Crossword", 1, 1);
    this.done = false;
    this.game_report = [];
    let layout = generate_layout(
      CrosswordModel.DIFFICULTY,
      CrosswordModel.NUM_OF_CLUES
    );
    this.cols = layout.cols;
    this.rows = layout.rows;
    this.layout = {
      dimensions: [layout.rows, layout.cols],
      boardWords: layout.result.filter(function (word) {
        return word.orientation != "none";
      }),
    };
    let i = 1;
    for (const word of this.layout.boardWords) {
      word.position = i;
      i = i + 1;
    }
    // console.log(this.layout.boardWords);
    this.empty_layout = this.layout.boardWords.map(
      ({ answer, ...item }) => item
    );
    this.final_state_string = JSON.stringify(layout.table);
    this.current_boardstate = layout.table;
    // remove letters from the table so we have an empty board to start with. black squares are '-' white squares are ' '
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.current_boardstate[i][j] != "-") {
          this.current_boardstate[i][j] = " ";
        }
      }
    }

    this.claims_by_position = new Array(this.layout.boardWords.length).fill(-1);
    this.num_of_clues = this.layout.boardWords.length;
    this.claims_by_player = [];

    this.game_report.push({
      time: Date.now(),
      layout: this.layout,
    });
  }
  play(number_of_players) {
    super.play(number_of_players);
    this.number_of_players = number_of_players;
    this.claims_by_player = new Array(number_of_players).fill(-1);
  }
  // move_description = {type="claim"/"release"/"move", body=parameters of action}
  make_move(move_description) {
    if (this.done == false) {
      let { type, body } = move_description;
      this.game_report.push({
        time: Date.now(),
        type: type,
        player: body.player,
        body: body,
      });
      if (type == "move") {
        this.apply_move(move_description);
      } else if (type == "claim") {
        this.claim_clue_by_position(body);
      } else if (type == "release") {
        this.release_claim(body);
      }
    }
  }
  // Lock a clue's row/column for a certain player (by position as defined in crosswordgenerator)
  // Checks if player and position are both valid. If so, releases previous claim of player and checks
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
        this.release_claim({ position: previous_claim + 1, player });
      }
      if (this.claims_by_position[position] == -1) {
        this.claims_by_position[position] = player;
        this.claims_by_player[player] = position;
        this.emit("Move made", {
          type: "claim",
          body: {
            position: position + 1,
            player: player,
          },
        });
      }
    }
  }

  // Given player and wordIndex, releases claim if player has the claim to word.
  release_claim(body) {
    let { position, player } = body;
    position--;
    if (this.claims_by_player.length > player && player >= 0) {
      if (this.claims_by_position.length > position && position >= 0) {
        if (
          this.claims_by_player[player] == position &&
          this.claims_by_position[position] == player
        ) {
          this.claims_by_position[position] = -1;
          this.claims_by_player[player] = -1;
          this.emit("Move made", {
            type: "release",
            body: {
              position: position + 1,
              player: player,
            },
          });
          return;
        }
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
      index < this.layout.boardWords[position].clue.length
    );
  }

  // Given clue position and index of letter in clue,
  // returns the coordinates of the letter on the board.
  position_index_to_coords(position, index) {
    if (position > 0 && position <= this.num_of_clues) {
      let clue = this.layout.boardWords[position - 1];
      if (index < clue.answer.length && index >= 0) {
        if (clue.orientation == "across") {
          return [clue.starty - 1, clue.startx - 1 + index];
        } else if (clue.orientation == "down") {
          return [clue.starty - 1 + index, clue.startx - 1];
        }
      }
    }
    return [-1, -1];
  }

  //Calls validate_move. If the move is valid, applies move (puts letter into cell)
  apply_move(move_description) {
    if (this.validate_move(move_description.body)) {
      const { letter, position, index, player } = move_description.body;
      let coords = this.position_index_to_coords(position, index);
      this.current_boardstate[coords[0]][coords[1]] = letter;
      // delete move_description.index;
      // move_description.position = coords
      this.emit("Move made", move_description);
      if (JSON.stringify(this.current_boardstate) == this.final_state_string) {
        this.done = true;
        this.emit("Game ended");
        console.log("done");
      }
    }
  }
  get_state() {
    return Object.assign({}, super.get_state(), {
      claims_by_player: this.claims_by_player,
      claims_by_position: this.claims_by_position,
      current_boardstate: this.current_boardstate,
      boardDescription: this.layout,
    });
  }

  get_game_report() {
    return this.game_report;
  }
}
module.exports = { CrosswordModel };
