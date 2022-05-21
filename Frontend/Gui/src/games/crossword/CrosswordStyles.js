import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { CellState } from "./Components/Cell/cellStates";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function toResponsive(orientation, value) {
  return orientation(value.toString() + "%");
}

var boardFrameHeight = 40;
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
    // flex: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    height: toResponsive(hp, boardFrameHeight), // 70% of height device screen
    width: toResponsive(wp, boardFrameWidth), // 80% of width device screen
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
    // flex: 1,
    // justifyContent: "space-around",
  },
});

const cellStyle = function (cellState, cellColor) {
  const borderColor =
    cellState === CellState.ACTIVE ? COLORS.black : COLORS.white;

  const style = StyleSheet.create({
    cell: {
      backgroundColor: cellColor,
      borderColor: borderColor,
      // justifyContent: "center",
      // alignItems: "center",
      // TODO: make dynamic based on cell status(occupied or not and if occupied then color should be the same as the player color)
      flex: 1,
      borderWidth: 0.5,
    },
    cellContent: {
      // flex: 1,
      // justifyContent: "center",
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return style;
};

export { mainViewStyle, boardStyle, cellStyle };