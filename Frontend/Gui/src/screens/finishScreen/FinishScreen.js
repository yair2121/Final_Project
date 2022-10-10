// Placeholder screen copied from loadingScreen.js
// If you wish to change the name of the component from FinishScreen
// change ../gameScreen/GameScreen.js accordingly (line 60 as of writing this comment)

import { View } from "react-native";
import React from "react";

import { Text } from "react-native-elements";

import { loadingStyles } from "./finishStyle";

export default function FinishScreen({ gameName }) {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.title}>Game Over {gameName}</Text>
    </View>
  );
}
