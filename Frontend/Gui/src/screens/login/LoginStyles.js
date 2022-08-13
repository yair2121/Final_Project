import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { isMobilePlatform } from "../../generalUtils/systemUtils";
import { heightResponsive, widthResponsive } from "../../stylingUtils.js";

const borderRadius = 30;

export const LoginStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: isMobilePlatform() ? "60%" : "0%",
  },
  logo: {
    width: widthResponsive(20),
    height: heightResponsive(10),
    marginBottom: "15%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  inputView: {
    backgroundColor: COLORS.white,
    width: widthResponsive(70),
    height: heightResponsive(4),
    borderRadius: borderRadius,
    overflow: "hidden",
    alignItems: "center",
  },
  TextInput: {
    textAlign: "center",
    width: widthResponsive(70),
    height: heightResponsive(4),
    borderRadius: borderRadius,
    borderColor: "black",
    fontSize: isMobilePlatform() ? 20 : 25,
    fontWeight: "bold",
  },
  space: {
    height: heightResponsive(2),
  },

  loginBtnContainer: {
    width: widthResponsive(80),
    height: heightResponsive(4.5),
    backgroundColor: COLORS.pink,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
    fontSize: isMobilePlatform() ? 20 : 25,
  },
});
