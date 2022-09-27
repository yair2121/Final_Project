import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { isMobilePlatform } from "../../generalUtils/systemUtils";
import { heightResponsive, widthResponsive } from "../../stylingUtils.js";

const borderRadius = 30;

export const LoginStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: isMobilePlatform ? "60%" : "0%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    height: heightResponsive(6),
    borderRadius: borderRadius,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  TextInput: {
    fontSize: isMobilePlatform ? 20 : 25,
    borderRadius: borderRadius,
    borderColor: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  space: {
    height: heightResponsive(2),
  },

  loginBtnContainer: {
    backgroundColor: COLORS.pink,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: isMobilePlatform ? -14 : 0,
    width: widthResponsive(90),
    height: heightResponsive(5),
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
    fontSize: isMobilePlatform ? 20 : 25,
  },
});
