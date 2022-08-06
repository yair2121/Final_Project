import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const gameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  contentBox: {
    // alignItems: "center",
    // backgroundColor: "white",
    // width: SCREENSIZE.width * 0.8,
    flex: 1,
    // aspectRatio: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    alignSelf: "center",
  },
});
