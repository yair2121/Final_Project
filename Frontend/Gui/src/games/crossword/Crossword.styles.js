import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { CellState } from "./Components/Cell/cellStates";

const mainViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
  },
  boardFrame: {
    flex: 0.5,
    backgroundColor: "white",
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
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderColor: "black",
    // borderWidth: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    // justifyContent: "space-around",
  },
});

const cellStyle = function (cellState) {
  const cellColor =
    cellState === CellState.ACTIVE ? COLORS.white : COLORS.black;
  const borderColor =
    cellState === CellState.ACTIVE ? COLORS.black : COLORS.white;

  const style = StyleSheet.create({
    cell: {
      backgroundColor: cellColor,
      borderColor: borderColor,
      // TODO: make dynamic based on cell status(occupied or not and if occupied then color should be the same as the player color)
      flex: 1,
      borderWidth: 0.5,
    },
    cellContent: {
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });
  return style;
};

export { mainViewStyle, boardStyle, cellStyle };
