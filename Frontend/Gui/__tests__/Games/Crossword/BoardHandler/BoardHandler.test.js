import { BoardHandler } from "../../../../src/games/crossword/Components/Board/boardHandler";

const boardWords = JSON.parse(
  '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}'
);
const UNOCCUPIED = -1;

describe("Test BoardUtils class", () => {
  beforeEach(() => {
    boardHandler = new BoardHandler(9, 10, boardWords);
  });

  test("initBoard will create a board with the same dimensions as input dimensions", () => {
    let dimensions = [9, 10];
    let board = BoardHandler.initBoard(dimensions[0], dimensions[1]);
    expect(
      dimensions[0] === board.length[0] && dimensions[1] === board.length
    ).toBeTruthy();
  });

  // test("occupyWord will change state of given word to the given player index", () => {
  //   let initialState = boardHandler.words[0];
  //   expect(
  //     dimensions[0] === board.length[0] && dimensions[1] === board.length
  //   ).toBeTruthy();
  // });
});
