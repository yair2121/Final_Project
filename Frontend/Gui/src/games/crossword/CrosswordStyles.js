import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { CellState } from "./Components/Cell/cellStates";

import { heightResponsive, widthResponsive } from "../../stylingUtils";
import { isMobilePlatform } from "../../generalUtils/systemUtils";

var boardFrameHeight = 60;
var boardFrameWidth = 90;

if (Platform.OS === "web") {
  var boardFrameHeight = 100;
  var boardFrameWidth = 50;
}
let isMobile = isMobilePlatform();

const mainViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
  },
  // boardFrame: {
  //   flex: 1,
  //   // flexDirection: "row",
  //   borderColor: COLORS.black,
  //   backgroundColor: COLORS.white,
  //   // width: widthResponsive(boardFrameWidth), // 80% of width device screen
  //   // height: heightResponsive(boardFrameHeight), // 70% of height device screen
  //   aspectRatio: isMobile ? 1 : 0,
  // },

  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
});
const boardStyle = StyleSheet.create({
  board: {
    // flex: 1,
    // backgroundColor: "white",
    width: widthResponsive(boardFrameWidth),
    height: heightResponsive(boardFrameHeight),
    // aspectRatio: 1,
  },
  row: {
    flexDirection: "row",
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
      backgroundColor: cellColor,
      borderColor: isMobile ? borderColor : "",
      flex: 1,
      borderWidth: 0.5,
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
    width: widthResponsive(boardFrameWidth),
    height: heightResponsive(7),
    backgroundColor: COLORS.black,
  },
  clueText: {
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export { mainViewStyle, boardStyle, cellStyle, clueStyle };
