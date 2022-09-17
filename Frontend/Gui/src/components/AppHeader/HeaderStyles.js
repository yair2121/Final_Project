import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
// import { isMobilePlatform } from "../../generalUtils/systemUtils";
// import { heightResponsive, widthResponsive } from "../../stylingUtils.js";

export const HeaderStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.25,
    borderBottomColor: COLORS.black,
  },
  heading: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
  },

  settingButton: {
    width: 46,
    height: 38,
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    justifyContent: "flex-start",
    width: 46,
    height: 38,
    marginTop: 10,
    marginBottom: 10,
  },
});
