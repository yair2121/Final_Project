import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const DefaultHeaderStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.25,
    borderBottomColor: COLORS.black,
  },

  heading: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
  },

  backButton: {
    justifyContent: "flex-start",
    width: 46,
    height: 38,
    marginTop: 10,
    marginBottom: 10,
  },
});
