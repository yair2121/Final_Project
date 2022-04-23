import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

const mainViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
  },
  boardFrame: {
    flex: 0.5,
    backgroundColor: "white",
    aspectRatio: 1,
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
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
});
const cellStyle = StyleSheet.create({
  cell: {
    borderColor: COLORS.black,
    // TODO: make dynamic based on cell status(occupied or not and if occupied then color should be the same as the player color)
    flex: 1,
    borderWidth: 0.5,
    ...Platform.select({
      web: { aspectRatio: 0 },
      default: {
        aspectRatio: 1,
      },
    }),
    justifyContent: "center",
    alignItems: "center",
  },
  cellContent: {
    fontWeight: "bold",
  },
});
export { mainViewStyle, boardStyle, cellStyle };
