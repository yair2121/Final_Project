import { isMobilePlatform } from "../../../generalUtils/systemUtils";

export const INVALID_WORD_POSITION = -1;
export const UNOCCUPIED = 0;
export const UNDEFINED_WORD = -1;
export const LOCAL_PLAYER = 1;
export const UNDEFINED_POSITION = [-1, -1];
export const DEFAULT_CLUE = isMobilePlatform
  ? "CLUES: press here to change font size" // Changing font only for Mobile (Web does not support adjustsFontSizeToFit).
  : "Clues";
