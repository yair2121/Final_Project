import { map, prop, range } from "ramda";
import { CellState } from "../Cell/cellStates";
// static getBoardJSON() {
//     return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
// }
const UNOCCUPIED = -1; // TODO: move this to the const directory.
const LOCALPLAYER = 1; // TODO: move this to the const directory.
export class BoardHandler {
  /**
   * This class is used for the Board component to maintain the board data and state which includes:
   * 1. Create the board array.
   * 2. Which word is currently focused and by which player.
   * 3. Which cell is active and which is not.
   * @param {Number} rowCount: amount of rows in the board.
   * @param {Number} columnCount: amount of columns in the board.
   * @param {Object} boardWords: description of each word(position, orientation, clue)
   */
  constructor(boardDescription) {
    this.currentFocusedWord = UNOCCUPIED;
    this.board = this.initBoard(boardDescription.dimensions);
    this.words = boardDescription.boardWords;
    for (let [index] of this.words.entries()) {
      this.words[index]["state"] = UNOCCUPIED;
      this.words[index]["positions"] = this.getWordPositions(this.words[index]);
    }
    this.activateWordsOnBoard(boardDescription.boardWords);
  }

  getWordIndexByPosition(position) {
    return this.words[position - 1];
  }
  getOrientationDirection(orientation) {
    return orientation === "across" ? [0, 1] : [1, 0];
  }
  getWordPositions(wordDescription) {
    let wordLength = wordDescription.answer.length;
    let direction = this.getOrientationDirection(wordDescription.orientation);
    let row = wordDescription.starty - 1;
    let column = wordDescription.startx - 1;
    let resultPositions = [];
    map(() => {
      resultPositions.push([row, column]);
      row += direction[0];
      column += direction[1];
    }, range(0, wordLength));
    return resultPositions;
  }
  getWordLength(wordIndex) {
    return this.words[wordIndex].answer.length;
  }
  isWordFree(wordIndex) {
    return this.words[wordIndex].state === UNOCCUPIED;
  }
  /**
   * Change the state of given word to unoccupied.
   * @param {Number} wordIndex
   */
  freeWord(wordIndex) {
    this.words[wordIndex].state = UNOCCUPIED;
  }
  // TODO: ask server here.
  serverCanOccupyWord(wordIndex) {
    return true;
  }
  canOccupyWord(wordIndex) {
    return this.isWordFree(wordIndex) && this.serverCanOccupyWord(wordIndex);
  }

  /**
   * Occupy given word if it's currently free and the server approve it.
   * @param {Number} wordIndex
   * @param {Number} playerIndex
   */
  occupyWord(wordIndex) {
    if (this.canOccupyWord(wordIndex)) {
      this.words[wordIndex].state = LOCALPLAYER;
    }
  }
  // getNextWordIndex(row, column, wordDescription) {
  //   let direction = this.getOrientationDirection(wordDescription.orientation);
  //   return;
  // }
  initBoard(dimensions) {
    const [rowCount, columnCount] = dimensions;
    return map((row) => {
      return map((column) => {
        return {
          // Information that each cell holds:
          row: row,
          column: column,
          cellState: CellState.NONACTIVE, //Default state.
          value: "",
          words: {}, // indexes of words which this cell is part of(max is 2).
        };
      }, range(0, columnCount));
    }, range(0, rowCount));
  }
  activateWordOnBoard(wordDescription) {
    let positions = this.words[wordDescription.position - 1].positions;
    let orientation = wordDescription["orientation"];
    positions.forEach((position) => {
      let [row, column] = position;
      this.board[row][column].cellState = CellState.ACTIVE;
      this.board[row][column].words[orientation] = wordDescription.position;
    });
  }
  /**
   * For each word- change all of the word cells to active and attach the word index to the relevant cells.
   * @param {Object} wordsDescriptions
   */
  activateWordsOnBoard(wordsDescriptions) {
    wordsDescriptions.forEach((wordDescription) => {
      this.activateWordOnBoard(wordDescription);
    });
  }
}
