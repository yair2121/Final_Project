import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { CellState } from "./Components/Cell/cellStates";

import { heightResponsive, widthResponsive } from "../../stylingUtils";
import { isMobilePlatform } from "../../generalUtils/systemUtils";

var boardWidthPercent = 90;
var boardHeightPercent = 100;

if (Platform.OS === "web") {
  var boardWidthPercent = 40;
  var boardHeightPercent = 60;
}

const mainViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boardFrame: {
    flex: 9,
    borderColor: COLORS.black,
    // aspectRatio: isMobile ? 1 : 0,
  },

  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
});
const boardStyle = StyleSheet.create({
  board: {
    flex: 1,
    width: widthResponsive(boardWidthPercent),
    height: heightResponsive(boardHeightPercent),
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
});

const cellStyle = function (cellState, cellColor, isFocused) {
  const borderColor =
    cellState === CellState.ACTIVE ? COLORS.black : COLORS.white;

  if (isFocused) {
    cellColor = COLORS.grey;
  }
  const style = StyleSheet.create({
    cell: {
      flex: 1,
      backgroundColor: cellColor,
      borderColor: borderColor,
      // borderColor: isMobile ? borderColor : "",
      borderWidth: isMobilePlatform ? 0.2 : 0.1,
      justifyContent: "center",
    },
    cellInput: {
      fontWeight: "bold",
      textAlign: "center",

      textTransform: "uppercase",
    },
    cellWord: {
      position: "absolute",
      top: -3,
      left: 0,
      zIndex: 1,
    },
  });
  return style;
};

const clueStyle = StyleSheet.create({
  clueContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  clueText: {
    width: widthResponsive(boardWidthPercent),
    // height: heightResponsive(10),

    textAlign: "center",
    letterSpacing: 0.3,
    // textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export { mainViewStyle, boardStyle, cellStyle, clueStyle };
