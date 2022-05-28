import { map, prop, range } from "ramda";
import { CellState } from "../Cell/cellStates";
// static getBoardJSON() {
//     return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
// }
const UNOCCUPIED = -1; // TODO: move this to the const directory.
const LOCALPLAYER = 1; // TODO: move this to the const directory.
const UNDEFINEDPOSITION = [-1, -1]; // TODO: move this to the const directory.
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

  // getWordByPosition(position) {
  //   return this.words[position - 1];
  // }
  getWordByIndex(wordIndex) {
    return this.words[wordIndex];
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
  getWordIndex(wordDescription) {
    return this.positionToIndex(wordDescription["position"]);
  }
  getRowCount() {
    return this.board.length;
  }
  getColumnCount() {
    return this.board[0].length;
  }
  getNextWordIndex(row, column) {
    if (!this.isActivePosition(row, column)) {
      return [row, column];
    }
    let currentWord = this.getWordByIndex(this.currentFocusedWord);
    let direction = this.getOrientationDirection(currentWord.orientation);
    let nextRow = row + direction[0];
    let nextColumn = column + direction[1];
    if (this.isActivePosition(nextRow, nextColumn)) {
      return [nextRow, nextColumn];
    }
    return [row, column];
  }
  isActivePosition(row, column) {
    return (
      row < this.getRowCount() &&
      column < this.getColumnCount() &&
      this.board[row][column].cellState !== CellState.NONACTIVE
    );
  }

  isWordFree(wordIndex) {
    return this.words[wordIndex].state === UNOCCUPIED;
  }
  positionToIndex(position) {
    return position - 1;
  }

  /**
   * Change the state of given word to unoccupied.
   * @param {Number} wordIndex
   */
  freeWord(wordIndex) {
    this.words[wordIndex].state = UNOCCUPIED;
    this.currentFocusedWord = UNOCCUPIED;
  }
  // TODO: ask server here.
  serverCanOccupyWord(wordIndex) {
    return true;
  }
  canOccupyWord(wordIndex) {
    return this.isWordFree(wordIndex) && this.serverCanOccupyWord(wordIndex);
  }
  freeFocusedWord() {
    if (this.currentFocusedWord !== UNOCCUPIED) {
      // let wordToFree = this.getWordByIndex(this.currentFocusedWord);
      this.freeWord(this.currentFocusedWord);
    }
  }

  /**
   * Occupy given word if it's currently free and the server approve it.
   * @param {Number} wordIndex
   * @param {Number} playerIndex
   */
  occupyWord(wordIndex) {
    if (this.currentFocusedWord !== UNOCCUPIED) {
      this.freeWord(this.currentFocusedWord);
    }
    this.words[wordIndex].state = LOCALPLAYER;
    this.currentFocusedWord = wordIndex;
  }

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
