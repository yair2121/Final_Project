import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { isMobilePlatform } from "../../generalUtils/systemUtils";
import { heightResponsive, widthResponsive } from "../../stylingUtils";

export const gameSelectionStyles = StyleSheet.create({
  list: {
    flex: 1,
    width: isMobilePlatform ? widthResponsive(70) : widthResponsive(50),

    marginTop: isMobilePlatform ? "20%" : "2%",
  },
  button: {
    backgroundColor: COLORS.green,
    borderRadius: 25,
    marginVertical: isMobilePlatform ? "5%" : "2%",
    height: isMobilePlatform ? heightResponsive(5) : heightResponsive(10),
    justifyContent: "center",
  },
  gameTitle: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    color: COLORS.white,
  },
});
