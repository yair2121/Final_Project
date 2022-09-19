import DefaultHeader from "./headersComponents/DefaultHeader";
import GameHeader from "./headersComponents/GameHeader";

export const HEADER_TYPES = {
  DEFAULT: 0,
  GAME: 1,
};

const HEADERS = {};
HEADERS[HEADER_TYPES.DEFAULT] = DefaultHeader;
HEADERS[HEADER_TYPES.GAME] = GameHeader;
export default HEADERS;
