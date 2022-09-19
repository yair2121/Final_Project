import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const DefaultHeaderStyles = StyleSheet.create({
  container: {
    // flex: 1,
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

// let exitBtnWidth = isMobilePlatform ? widthResponsive(10) : widthResponsive(1);
// let exitBtnHeight = isMobilePlatform
//   ? heightResponsive(4)
//   : heightResponsive(4);

// // export const GameHeaderStyle = StyleSheet.create({
// //   exitBtnContainer: {
// //     // flex: 1,
// //     width: exitBtnWidth,
// //     height: exitBtnHeight,
// //     backgroundColor: COLORS.pink,
// //     borderRadius: 25,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   exitBtnText: {
// //     textAlign: "center",
// //     fontWeight: "bold",
// //     color: COLORS.white,
// //     fontFamily: "",
// //     fontSize: isMobilePlatform ? 10 : 10,
// //   },
// });
