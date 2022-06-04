const { CrosswordModel } = require("../../Games/Crossword/CrosswordModel");
let crossword_model = null;
describe("Test claim management in CrosswordModel", () => {
  beforeEach(() => {
    crossword_model = new CrosswordModel("test");
    jest.spyOn(crossword_model, "claim_clue_by_position");
    crossword_model.play(4);
  });
  test("claim_clue_by_position returns -1 when invalid claim", () => {
    claim = { position: 6, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claim_clue_by_position).lastReturnedWith(-1);
    claim = { position: 1, player: 4 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claim_clue_by_position).lastReturnedWith(-1);
    claim = { position: 0, player: 4 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claim_clue_by_position).lastReturnedWith(-1);
    claim = { position: -1, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claim_clue_by_position).lastReturnedWith(-1);
    claim = { position: 0, player: -1 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claim_clue_by_position).lastReturnedWith(-1);
  });
  test("claim_clue_by_position returns position when valid claim", () => {
    for (let i = 1; i < 6; i++) {
      claim = { position: i, player: 0 };
      crossword_model.claim_clue_by_position(claim);
      expect(crossword_model.claim_clue_by_position).lastReturnedWith(i);
    }
  });
  test("claim_clue_by_position returns -1 when claim taken", () => {
    claim = { position: 1, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    claim = { position: 1, player: 1 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claim_clue_by_position).lastReturnedWith(-1);
  });
  test("claim_clue_by_position claims requested position", () => {
    claim = { position: 1, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claims_by_position[0]).toEqual(0);
    expect(crossword_model.claims_by_player[0]).toEqual(0);
  });
  test("claim_clue_by_position releases previous claim", () => {
    claim = { position: 1, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    claim = { position: 2, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    expect(crossword_model.claims_by_position[0]).toEqual(-1);
  });
  test("release_claim_by_position releases claim", () => {
    claim = { position: 1, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    crossword_model.release_claim(0);
    expect(crossword_model.claims_by_position[0]).toEqual(-1);
    expect(crossword_model.claims_by_player[0]).toEqual(-1);
  });
});

describe("Test moves in CrosswordModel", () => {
  beforeEach(() => {
    crossword_model = new CrosswordModel("test");
    jest.spyOn(crossword_model, "apply_move");
    crossword_model.play(4);
  });
  test("make_move does not call apply_move when player has no claim", () => {
    move = { letter: "a", position: 1, index: 0, player: 0 };
    crossword_model.make_move(move);
    expect(crossword_model.apply_move).toHaveBeenCalledTimes(0);
  });
  test("make_move correctly applies move if valid", () => {
    claim = { position: 1, player: 0 };
    crossword_model.claim_clue_by_position(claim);
    move = { letter: "a", position: 1, index: 0, player: 0 };
    crossword_model.make_move(move);
    coords = crossword_model.position_index_to_coords(1, 0);
    expect(
      crossword_model.current_boardstate[coords[0]][coords[1]] == "a"
    ).toBeTruthy();
    move = { letter: "b", position: 1, index: 0, player: 0 };
    crossword_model.make_move(move);
    coords = crossword_model.position_index_to_coords(1, 0);
    expect(
      crossword_model.current_boardstate[coords[0]][coords[1]] == "b"
    ).toBeTruthy();
  });
});

describe("Test utility functions in CrosswordModel", () => {
  beforeEach(() => {
    crossword_model = new CrosswordModel("test");
    jest.spyOn(crossword_model, "position_index_to_coords");
    jest.spyOn(crossword_model, "claim_clue_by_position");
    crossword_model.play(4);
  });
  test("Test position_index_to_coords returns correct", () => {
    crossword_model.position_index_to_coords(1, 0);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      7, 3,
    ]);
    crossword_model.position_index_to_coords(1, 3);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      7, 6,
    ]);
    crossword_model.position_index_to_coords(1, 4);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      -1, -1,
    ]);
    crossword_model.position_index_to_coords(0, 3);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      -1, -1,
    ]);
    //Across
    crossword_model.position_index_to_coords(3, 0);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      1, 8,
    ]);
    crossword_model.position_index_to_coords(3, 9);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      10, 8,
    ]);
    crossword_model.position_index_to_coords(3, -1);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      -1, -1,
    ]);
    crossword_model.position_index_to_coords(3, 10);
    expect(crossword_model.position_index_to_coords).toHaveLastReturnedWith([
      -1, -1,
    ]);
  });
});
