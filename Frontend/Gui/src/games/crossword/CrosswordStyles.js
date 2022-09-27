import { Dimensions, Platform, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { CellState } from "./Components/Cell/cellStates";

import { heightResponsive, widthResponsive } from "../../stylingUtils";
import { isMobilePlatform } from "../../generalUtils/systemUtils";

var boardWidthPercent = 99;
var boardHeightPercent = 99;

if (Platform.OS === "web") {
  var boardWidthPercent = 35;
  var boardHeightPercent = 35;
}

const { fontScale } = Dimensions.get("window");
let cellWordOffset = isMobilePlatform ? -1 : -2;
let celWordLeftOffset = 0;
let celWordFontSize = isMobilePlatform ? 6 : 9;
celWordFontSize /= fontScale;

let celInputFontSize = isMobilePlatform ? 8 : 23;
celInputFontSize /= fontScale;

const mainViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boardFrame: {
    flex: 9,
    borderColor: COLORS.black,
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

const cellStyle = function (cellState, cellBackgroundColor, isFocused) {
  const borderColor =
    cellState === CellState.ACTIVE ? COLORS.black : COLORS.white;

  if (isFocused) {
    cellBackgroundColor = COLORS.grey;
  }

  const style = StyleSheet.create({
    cell: {
      flex: 1,
      backgroundColor: cellBackgroundColor,
      borderColor: borderColor,
      borderWidth: isMobilePlatform ? 0.2 : 0.1,
      justifyContent: "center",
    },
    cellInput: {
      fontSize: celInputFontSize,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
    },
    cellAcrossWord: {
      fontWeight: "bold",
      fontSize: celWordFontSize,
      position: "absolute",
      top: cellWordOffset,
      left: celWordLeftOffset,
      zIndex: 1,
    },
    cellDownWord: {
      fontWeight: "bold",
      fontSize: celWordFontSize,
      position: "absolute",
      left: celWordLeftOffset,
      zIndex: 1,
      bottom: cellWordOffset,
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
    textAlign: "center",
    letterSpacing: 0.3,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export { mainViewStyle, boardStyle, cellStyle, clueStyle };
