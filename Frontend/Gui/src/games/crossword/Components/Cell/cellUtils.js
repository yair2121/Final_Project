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
