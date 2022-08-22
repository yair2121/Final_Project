import { map, range } from "ramda";
import { ORIENTATION } from "../../consts/orientation";
import { CellState } from "../Cell/cellStates";
import { CellUtils } from "../Cell/cellUtils";
//import { SocketContext } from "../../../../contexts/SocketContext";

import {
  UNOCCUPIED,
  UNDEFINED_POSITION,
  LOCAL_PLAYER,
  UNDEFINED_WORD,
} from "../../consts/generalConsts";

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
    this.setClue = setClue; // Will set state of clue on the Crossword component.
    this.focusedWordIndex = UNDEFINED_WORD;
    this.focusedCellPosition = UNDEFINED_POSITION;
    this.board = this.initBoard(boardDescription.dimensions);
    this.words = boardDescription.boardWords;

    for (let [index] of this.words.entries()) {
      this.words[index].state = UNOCCUPIED;
      this.words[index].positions = this.getWordPositions(this.words[index]);
    }

    this.activateWordsOnBoard(boardDescription.boardWords);
  }

  initBoard(dimensions) {
    const [rowCount, columnCount] = dimensions;
    return map((row) => {
      return map((column) => {
        return new CellUtils(row, column, CellState.NONACTIVE, "", {}); // Initial state of all cells is NONACTIVE
      }, range(0, columnCount));
    }, range(0, rowCount));
  }

  /**
   * Activate the word on the board and add word index to all the cells which belongs to given words.
   * @param {Object} wordDescription
   */
  activateWordOnBoard(wordDescription) {
    let wordIndex = this.getWordIndex(wordDescription);
    let positions = this.words[wordIndex].positions;
    let orientation = wordDescription["orientation"];

    positions.forEach((position) => {
      let cell = this.getCell(position);
      cell.state = CellState.ACTIVE;
      cell.words[orientation] = this.getWordIndex(wordDescription);
    });

    this.getCell(positions[0]).activateStartOfWord(orientation);
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

  getCell(position) {
    return this.board[position[0]][position[1]];
  }

  /**
   * @param {Number} wordIndex.
   * @returns Word Description.
   */
  getWord(wordIndex) {
    return this.words[wordIndex];
  }

  /*
  Return the currently in focus cell.
  */
  getFocusedCell() {
    let [row, column] = this.focusedCellPosition;
    return this.board[row][column];
  }

  /**
   * @returns a two numbers array which defined the direction in the row and column.
   */
  getOrientationDirection(orientation) {
    return orientation === ORIENTATION.ACROSS ? [0, 1] : [1, 0];
  }

  /**
   * Find all the positions on the board which are part of the given word.
   * @param {Object} wordDescription.
   * @returns array of positions on the board.
   */
  getWordPositions(wordDescription) {
    let wordLength = this.getWordLength(wordDescription);
    let direction = this.getOrientationDirection(wordDescription.orientation);
    let [row, column] = this.getWordStartPosition(wordDescription);
    let resultPositions = [];
    map(() => {
      resultPositions.push([row, column]);
      row += direction[0];
      column += direction[1];
    }, range(0, wordLength));
    return resultPositions;
  }

  getWordLength(wordDescription) {
    return wordDescription.answer.length;
  }

  getWordStartPosition(wordDescription) {
    return [wordDescription.starty - 1, wordDescription.startx - 1]; // -1 Because startx and starty starts from 1.
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

  /**
   * Advance one position on the current focused word.
   */
  advanceFocusedWordIndex() {
    if (this.isActivePosition(this.focusedCellPosition)) {
      let currentWord = this.getWord(this.focusedWordIndex);
      let direction = this.getOrientationDirection(currentWord.orientation);
      let [row, column] = this.focusedCellPosition;
      let nextPosition = [row + direction[0], column + direction[1]];
      // Checks whether the new positions is valid and active.
      if (this.isActivePosition(nextPosition)) {
        let nextCell = this.getCell(nextPosition);
        this.setFocusedCell(nextCell);
      }
    }
  }

  freeFocusedCell() {
    if (this.isCellFocused()) {
      this.getCell(this.focusedCellPosition).isFocused = false;
      this.focusedCellPosition = UNDEFINED_POSITION;
    }
  }

  setFocusedCell(cell) {
    this.freeFocusedCell(); // free current focus.
    this.focusedCellPosition = [cell.row, cell.column];
    cell.isFocused = true;
  }

  setFocusedWord(wordIndex) {
    this.focusedWordIndex = wordIndex;
    //TODO: tell server
  }

  isSamePosition(position1, position2) {
    return position1[0] === position2[0] && position1[1] === position2[1];
  }

  isCellFocused() {
    return !this.isSamePosition(this.focusedCellPosition, UNDEFINED_POSITION);
  }

  isValidPosition(position) {
    return (
      position[0] !== UNDEFINED_POSITION[0] &&
      position[0] < this.getRowCount() &&
      position[1] < this.getColumnCount()
    );
  }

  /**
   * Checks whether given position is valid and it's cell state is active.
   * @param {Array} position
   * @returns True if given position is active.
   */
  isActivePosition(position) {
    return (
      this.isValidPosition(position) &&
      this.getCell(position).state === CellState.ACTIVE // is current cell active.
    );
  }

  isWordFree(wordIndex) {
    return this.words[wordIndex].state === UNOCCUPIED;
  }

  positionToIndex(position) {
    return position - 1;
  }

  /**
   * Checks whether changing word is required.
   * This method ignore other players focus.
   * @param {CellUtils} currentCell
   */
  shouldChangeWord(currentCell) {
    if (currentCell.isWordInCell(this.focusedWordIndex)) {
      if (
        !this.isSamePosition(
          currentCell.getPosition(),
          this.focusedCellPosition
        )
      ) {
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
    //TODO: tell server to free word.
  }

  serverCanOccupyWord(wordIndex) {
    // TODO: ask server here and claim the new word.
    return true;
  }

  canOccupyWord(wordIndex) {
    return this.isWordFree(wordIndex) && this.serverCanOccupyWord(wordIndex);
  }

  /**
   * Free focused word if necessary, return true if focused word was freed.
   */
  handleFocusedWordFreeing() {
    if (this.focusedWordIndex !== UNDEFINED_WORD) {
      this.freeWord(this.focusedWordIndex);
      this.freeFocusedCell();
      this.focusedWordIndex = UNDEFINED_WORD;
    }
  }
  /**
   * Given currentCell- determines the index of the next focused word.
   * Assumes the cell is active.
   * @returns Index of the next focused word.
   */
  getNewWord(currentCell) {
    let newWord;
    if (
      this.isSamePosition(currentCell.getPosition(), this.focusedCellPosition)
    ) {
      // If positions is equal- then new words is the currentCell word with opposite orientation to the current focusedWordIndex.
      newWord = this.getOppositeCellWord(
        currentCell,
        this.getWord(this.focusedWordIndex).orientation
      );
    } else {
      newWord = currentCell.getDefaultWord();
    }
    return newWord;
  }
  /**
   * Change focusedWord if necessary based on given current cell and return true if word was changed, false if not.
   * @param {Object} currentCell
   */
  handleWordChange(currentCell) {
    if (this.shouldChangeWord(currentCell)) {
      let newWord = this.getNewWord(currentCell);

      if (this.canOccupyWord(newWord)) {
        this.setClue(this.words[newWord].position, this.words[newWord].clue);
        this.occupyWord(newWord);
        this.setFocusedCell(currentCell);
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
    // Remove current word if needed.
    if (this.focusedWordIndex !== UNDEFINED_WORD) {
      this.freeWord(this.focusedWordIndex);
    }

    this.words[wordIndex].state = LOCAL_PLAYER;
    this.setFocusedWord(wordIndex);
  }
}
