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
    marginBottom: "5%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  inputView: {
    backgroundColor: COLORS.white,
    width: widthResponsive(70),
    height: heightResponsive(4),
    borderRadius: borderRadius,
    overflow: "hidden",
  },
  TextInput: {
    textAlign: "center",
    width: widthResponsive(70),
    height: heightResponsive(4),
    borderRadius: borderRadius,
    borderColor: "black",
    // borderColor: COLORS.black,
    fontSize: 16,
    // padding: 10,
    // marginLeft: 20,
  },
  loginBtn: {
    width: widthResponsive(80),
    height: heightResponsive(4.5),
    backgroundColor: COLORS.pink,
    // width: "80%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  loginText: {
    // height: heightResponsive(100),
    textAlign: "center",
    fontWeight: "bold",

    // flex: 1,
    // padding: 10,
    // marginLeft: 20,
  },
});
