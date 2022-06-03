import { map, range } from "ramda";
import { ORIENTATION } from "../../../../constants/orientation";
import { CellState } from "../Cell/cellStates";
import { CellUtils } from "../Cell/cellUtils";
// static getBoardJSON() {
//     return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
// }

const UNOCCUPIED = -1;
const LOCALPLAYER = 1;
const UNDEFINEDPOSITION = [-1, -1];

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
  constructor(boardDescription, setClue) {
    this.setClue = setClue;
    this.focusedWordIndex = UNOCCUPIED;
    this.focusedCell = UNDEFINEDPOSITION;
    this.board = this.initBoard(boardDescription.dimensions);
    this.words = boardDescription.boardWords;
    for (let [index] of this.words.entries()) {
      this.words[index]["state"] = UNOCCUPIED;
      this.words[index]["positions"] = this.getWordPositions(this.words[index]);
    }
    this.activateWordsOnBoard(boardDescription.boardWords);
  }

  getWord(wordIndex) {
    return this.words[wordIndex];
  }

  getOrientationDirection(orientation) {
    return orientation === ORIENTATION.ACROSS ? [0, 1] : [1, 0];
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
  /**
   * Given a cell and orientation- return the cell word with the opposite orientation.
   * Assumes the cell have two words.
   * @param {CellUtils} cell
   * @param {ORIENTATION} orientation
   * @returns
   */
  getOppositeCellWord(cell, orientation) {
    return orientation === ORIENTATION.ACROSS
      ? cell.words[ORIENTATION.DOWN]
      : cell.words[ORIENTATION.ACROSS];
  }
  updateFocusedWordIndex() {
    if (!this.isActivePosition(this.focusedCell)) {
      return this.focusedCell;
    }
    let currentWord = this.getWord(this.focusedWordIndex);
    let direction = this.getOrientationDirection(currentWord.orientation);
    let [row, column] = this.focusedCell;
    let nextRow = row + direction[0];
    let nextColumn = column + direction[1];
    if (this.isActivePosition([nextRow, nextColumn])) {
      this.setFocusedCell(this.board[nextRow][nextColumn]);
    }
  }

  freeFocusedCell() {
    if (this.isCellFocused()) {
      let row = this.focusedCell[0];
      let column = this.focusedCell[1];
      this.board[row][column].isFocused = false;
      this.focusedCell = UNDEFINEDPOSITION;
    }
  }
  setFocusedCell(cell) {
    this.freeFocusedCell();
    this.focusedCell = [cell.row, cell.column];
    cell.isFocused = true;
  }
  setFocusedWord(wordIndex) {
    this.focusedWordIndex = wordIndex;
  }
  isSamePosition(position1, position2) {
    return position1[0] === position2[0] && position1[1] === position2[1];
  }
  isCellFocused() {
    return !this.isSamePosition(this.focusedCell, UNDEFINEDPOSITION);
  }

  isActivePosition(position) {
    if (
      position[0] == -1 ||
      position[0] >= this.getRowCount() ||
      position[1] >= this.getColumnCount()
    ) {
      return false;
    }

    return this.board[position[0]][position[1]].state === CellState.ACTIVE;
  }

  isWordFree(wordIndex) {
    return this.words[wordIndex].state === UNOCCUPIED;
  }
  positionToIndex(position) {
    return position - 1;
  }
  /**
   * Checks whether changing word is required- ignoring other players focus.
   * @param {CellUtils} currentCell
   * @returns
   */
  shouldChangeWord(currentCell) {
    if (currentCell.isWordInCell(this.focusedWordIndex)) {
      if (!this.isSamePosition(currentCell.getPosition(), this.focusedCell)) {
        return false; // Same word- different position.
      }
      if (currentCell.getWordsCount() === 1) {
        return false; // Same position- cell only have one word so no need to switch orientation.
      }
    }
    return true;
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
   * Free focused word if necessary, return true if focused word was freed.
   */
  handleFocusedWordFreeing() {
    if (this.focusedWordIndex !== UNOCCUPIED) {
      this.freeWord(this.focusedWordIndex);
      this.freeFocusedCell();
      this.focusedWordIndex = UNOCCUPIED;
    }
  }
  /**
   * Change focusedWord if necessary based on given current cell and return true if word was changed, false if not.
   * @param {Object} currentCell
   */
  handleWordChange(currentCell) {
    if (this.shouldChangeWord(currentCell)) {
      var newWord;
      if (this.isSamePosition(currentCell.getPosition(), this.focusedCell)) {
        // If positions it equal- then new words is the currentCell word with opposite orientation to focusedWordIndex
        newWord = this.getOppositeCellWord(
          currentCell,
          this.getWord(this.focusedWordIndex).orientation
        );
      } else {
        newWord = currentCell.getDefaultWord();
      }
      if (this.canOccupyWord(newWord)) {
        this.setClue(this.words[newWord].position, this.words[newWord].clue);
        this.occupyWord(newWord);
        this.setFocusedCell(currentCell);
        this.setFocusedWord(newWord);
      }
    } else {
      this.setFocusedCell(currentCell); // Word isn't changed and Cell is on focused word- so only need to updated the focused cell.
    }
  }

  /**
   * Occupy given word.
   * @param {Number} wordIndex
   * @param {Number} playerIndex
   */
  occupyWord(wordIndex) {
    if (this.focusedWordIndex !== UNOCCUPIED) {
      this.freeWord(this.focusedWordIndex);
    }
    this.words[wordIndex].state = LOCALPLAYER;
    this.focusedWordIndex = wordIndex;
  }

  initBoard(dimensions) {
    const [rowCount, columnCount] = dimensions;
    return map((row) => {
      return map((column) => {
        return new CellUtils(row, column, CellState.NONACTIVE, "", {});
      }, range(0, columnCount));
    }, range(0, rowCount));
  }
  activateWordOnBoard(wordDescription) {
    let positions = this.words[wordDescription.position - 1].positions;
    let orientation = wordDescription["orientation"];
    positions.forEach((position) => {
      let [row, column] = position;

      this.board[row][column].state = CellState.ACTIVE;
      this.board[row][column].words[orientation] = wordDescription.position - 1;
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
