import { StyleSheet } from "react-native";
import React from "react";

import { COLORS } from "../../constants/colors";

// import { USER_KEY } from "../../constants/keys";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import GameSelection from "../../games/gameSelection/GamesSelection";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundStyle } from "../../constants/backgroundStyle";

// import GameSelection from "../../games/GamesSelection";
// AsyncStorage.getItem(USER_KEY).then((item) => {
//   console.log(JSON.parse(item));
// });
/*
This a main menu for the App which appears right after the user logging in.
It displays a games selection boxes.
*/
export default function MainMenu({ navigation }) {
  return (
    <LinearGradient colors={COLORS.background} style={backgroundStyle}>
      <SafeAreaView style={styles.container}>
        <GameSelection navigation={navigation} style={styles.inputView} />
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
