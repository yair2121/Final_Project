import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { isMobilePlatform } from "../../generalUtils/systemUtils";

export const loadingStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundBlue,
  },
  title: {
    marginTop: isMobilePlatform ? "30%" : "20%",
    color: COLORS.lightGreen,
    fontSize: 32,
    letterSpacing: 3,
    alignSelf: "center",
    fontStyle: "italic",
  },
  loadingWheel: {},
});
