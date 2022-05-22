import { StyleSheet, Dimensions } from "react-native";

import { COLORS } from "../../constants/colors";
import { keyboardKeys } from "../../constants/keyboardKeys";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / keyboardKeys[0].length;
const keyHeight = keyWidth * 1.3;

export default StyleSheet.create({
  keyboard: {
    alignSelf: "stretch",
    marginTop: "auto",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: keyWidth - 4,
    height: keyHeight - 4,
    margin: 2,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    color: COLORS.lightgrey,
    fontWeight: "bold",
  },
});
