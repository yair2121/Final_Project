import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const gameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
  },
  contentBox: {
    flex: 1,
  },
  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    alignSelf: "center",
  },
});
