import { map, prop, range } from "ramda";
import Cell from "../Cell";
import { CellState } from "../Cell/cellStates";
// static getBoardJSON() {
//     return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
//   }
export function createBoard(rowCount, columnCount, boardWords) {
  // INIT board values.
  const board = map((row) => {
    return map((column) => {
      return {
        cellRow: row,
        cellColumn: column,
        cellState: CellState.NONACTIVE, //Default state.
        value: "",
      };
    }, range(0, rowCount));
  }, range(0, columnCount));

  // INIT active cells(white).
  boardWords.forEach((wordDescription) => {
    let wordLength = wordDescription.answer.length - 1;
    let direction = wordDescription.orientation === "across" ? [0, 1] : [1, 0];
    let rowIndex = wordDescription.starty - 1; // Start from 1
    let columnIndex = wordDescription.startx - 1; // Start from 1
    map(() => {
      board[rowIndex][columnIndex].cellState = CellState.ACTIVE;
      rowIndex += direction[0];
      columnIndex += direction[1];
    }, range(0, wordLength));
  });
  return board;
}
