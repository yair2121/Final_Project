import { ORIENTATION } from "../../../../constants/orientation";

/**
 * Utils for handling the cells info.
 */
export class CellUtils {
  constructor(row, column, state, value, words) {
    this.row = row;
    this.column = column;
    this.state = state;
    this.value = value;
    this.words = words;
    this.isFocused = false;
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

  getWordsArray() {
    return Object.values(this.words);
  }

  getWordsCount() {
    return Object.keys(this.words).length;
  }

  getPosition() {
    return [this.row, this.column];
  }

  getWordPosition(orientation) {
    if (orientation in this.words) {
      return this.words[orientation] + 1; // +1 because position of word is starting from 1.
    }
    return -1;
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
    return Object.values(this.words).indexOf(wordIndex) > -1;
  }
}
