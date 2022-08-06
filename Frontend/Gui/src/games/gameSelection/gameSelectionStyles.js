import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { isMobilePlatform } from "../../generalUtils/systemUtils";
import { widthResponsive } from "../../stylingUtils";

export const gameSelectionStyles = StyleSheet.create({
  list: {
    flex: 1,
    width: isMobilePlatform() ? widthResponsive(70) : widthResponsive(50),
    marginTop: isMobilePlatform() ? "20%" : "2%",
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderRadius: 25,
    marginVertical: isMobilePlatform() ? "5%" : "2%",
  },
  gameTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
