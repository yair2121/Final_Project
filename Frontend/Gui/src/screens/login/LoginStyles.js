import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { heightResponsive, widthResponsive } from "../../stylingUtils.js";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 66,
    height: 58,
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    // height: 50,
    width: widthResponsive(80),
    height: heightResponsive(4.5),
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: widthResponsive(80),
    height: heightResponsive(4.5),
    backgroundColor: COLORS.pink,
    borderWidth: 0,
    // height: "20%",
    alignItems: "center",
    borderRadius: 30,
    // marginLeft: 35,
    // marginRight: 35,
    // marginTop: 20,
    // marginBottom: 25,
  },
  loginText: {
    // height: heightResponsive(100),
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
    padding: 10,
    // marginLeft: 20,
  },
});
