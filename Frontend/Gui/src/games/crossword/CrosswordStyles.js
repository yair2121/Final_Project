import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { CellState } from "./Components/Cell/cellStates";

import { heightResponsive, widthResponsive } from "../../stylingUtils";
import { isMobilePlatform } from "../../generalUtils/systemUtils";

var boardFrameHeight = 45;
var boardFrameWidth = 30;

if (Platform.OS === "web") {
  var boardFrameHeight = 100;
  var boardFrameWidth = 35;
}

const mainViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
  },
  boardFrame: {
    flex: 0,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    width: widthResponsive(boardFrameWidth), // 80% of width device screen
    height: heightResponsive(boardFrameHeight), // 70% of height device screen
    // aspectRatio: 1,
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
    // flex: 1,
    // display: "flex",
    // flexDirection: "column",
    // height: "100%",
    borderWidth: 0.1,
    // borderColor: "black",
    // borderWidth: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
});

const cellStyle = function (cellState, cellColor, isFocused) {
  // if (cellState === CellState.ACTIVE) {
  // }
  const borderColor =
    cellState === CellState.ACTIVE ? COLORS.black : COLORS.white;

  if (isFocused) {
    cellColor = COLORS.grey;
  }
  const style = StyleSheet.create({
    cell: {
      backgroundColor: cellColor,
      borderColor: isMobilePlatform() ? borderColor : "",
      flex: 1,
      borderWidth: 0.5,
    },
    activeCell: {
      // flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
    },
    cellInput: {
      // marginTop: "35%",
      fontWeight: "bold",
      textAlign: "center",

      textTransform: "uppercase",
    },
    cellWord: {
      position: "absolute",
      // marginRight: "50%",
      // textAlign: "left",
      // alignSelf: "flex-end",
      // alignSelf: "baseline",
      // marginRight: "auto",
      // position: "absolute",
      top: -2,
      left: 2,
      zIndex: 1,
    },
  });
  return style;
};

const clueStyle = StyleSheet.create({
  clueContainer: {
    flex: 1,
    textTransform: "uppercase",
  },
  clueText: {
    flex: 1,
    backgroundColor: COLORS.black,
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export { mainViewStyle, boardStyle, cellStyle, clueStyle };
