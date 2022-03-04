import { View } from "react-native";

import { StyleSheet } from "react-native";
import React from "react";

import { COLORS } from "../../constants/colors";

import { USER_KEY } from "../../constants/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GameSelection from "../../games/GamesSelection";

export default function MainMenu({ navigation }) {
  // AsyncStorage.getItem(USER_KEY).then((item) => {
  //   console.log(JSON.parse(item));
  // });
  return (
    <View style={styles.container}>
      <GameSelection navigation={navigation} />
    </View>
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
