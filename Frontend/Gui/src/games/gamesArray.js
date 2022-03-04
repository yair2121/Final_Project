import { SumGame, Crossword } from ".";
import uuid from "react-native-uuid";

const GAMES = [
  {
    key: uuid.v1(),
    title: "Sum Game",
    GameView: SumGame,
  },
  {
    key: uuid.v1(),
    title: "Crossword",
    GameView: Crossword,
  },
];

export default GAMES;
