import { INVALID_WORD_POSITION } from "../../consts/generalConsts";
import { ORIENTATION } from "../../consts/orientation";

/**
 * Utils for handling the cells logic and information.
 */
export class CellUtils {
  constructor(row, column, state, letter, words) {
    this.row = row;
    this.column = column;
    this.state = state;
    this.letter = letter;
    this.words = words; // Words which this cell is part of.s
    this.isFocused = false;

    // This flags determines whether this cell position is a start of a word
    this.isAcrossWordStart = false;
    this.isDownWordStart = false;
  }

  isStartOfWord() {
    return this.isAcrossWordStart || this.isDownWordStart;
  }

  activateStartOfWord(orientation) {
    if (orientation === ORIENTATION.ACROSS) {
      this.isAcrossWordStart = true;
    } else {
      this.isDownWordStart = true;
    }
  }

  /**
   * @returns All words that corresponds to this cell.
   */
  getWordsArray() {
    return Object.values(this.words);
  }

  /**
   * @returns Numbers of words that correspond to this cell.
   */
  getWordsCount() {
    return this.getWordsArray().length;
  }

  /**
   * @returns Position of this cell in a array of size 2 format.
   */
  getPosition() {
    return [this.row, this.column];
  }

  /**
   * @param {*} orientation.
   * @returns If exists- the word in given orientation the correspond to this cell.
   */
  getWordPosition(orientation) {
    if (orientation in this.words) {
      return this.words[orientation] + 1; // +1 because position of word is starting from 1.
    }
    return INVALID_WORD_POSITION;
  }

  /**
   * Default orientation is 'ACROSS'.
   * @returns wordIndex
   */
  getDefaultWord() {
    return ORIENTATION.ACROSS in this.words
      ? this.words[ORIENTATION.ACROSS]
      : this.words[ORIENTATION.DOWN];
  }

  isWordInCell(wordIndex) {
    return this.getWordsArray().indexOf(wordIndex) > -1;
  }
}
