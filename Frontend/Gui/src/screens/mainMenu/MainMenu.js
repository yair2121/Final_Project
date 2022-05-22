import { StyleSheet } from "react-native";
import React from "react";

import { COLORS } from "../../constants/colors";

import { USER_KEY } from "../../constants/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import GameSelection from "../../games/GamesSelection";
// AsyncStorage.getItem(USER_KEY).then((item) => {
//   console.log(JSON.parse(item));
// });
export default function MainMenu({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <GameSelection navigation={navigation} style={styles.inputView} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
