import { map, prop, range } from "ramda";
import Cell from "../Cell";
import { CellState } from "../Cell/cellStates";
// static getBoardJSON() {
//     return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
// }

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
  constructor(rowCount, columnCount, boardWords) {
    this.board = this.initBoard(rowCount, columnCount);
    this.addWordsToBoard(boardWords);
    this.wordsStates = new Array(boardWords.length).fill(0); //
  }

  initBoard(rowCount, columnCount) {
    return map((row) => {
      return map((column) => {
        return {
          row: row,
          column: column,
          cellState: CellState.NONACTIVE, //Default state.
          value: "",
          wordsIndexes: new Set(), // Words indexes which this cell is part of(max is 2).
        };
      }, range(0, rowCount));
    }, range(0, columnCount));
  }
  addWordToBoard(wordDescription) {
    let wordLength = wordDescription.answer.length - 1;
    let direction = wordDescription.orientation === "across" ? [0, 1] : [1, 0];
    let rowIndex = wordDescription.starty - 1; // Originally Start from 1
    let columnIndex = wordDescription.startx - 1; // Originally Start from 1
    map(() => {
      this.board[rowIndex][columnIndex].cellState = CellState.ACTIVE;
      this.board[rowIndex][columnIndex].wordsIndexes.add(
        wordDescription.position
      );
      rowIndex += direction[0];
      columnIndex += direction[1];
    }, range(0, wordLength));
  }
  addWordsToBoard(wordsDescriptions) {
    wordsDescriptions.forEach((wordDescription) => {
      this.addWordToBoard(wordDescription);
    });
  }
}
