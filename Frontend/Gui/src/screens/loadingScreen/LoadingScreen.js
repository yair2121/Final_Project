import { View } from "react-native";
import React from "react";

import { ActivityIndicator } from "react-native";

import { Text } from "react-native-elements";

import { loadingStyles } from "./loadingStyles";
import { COLORS } from "../../constants/colors";

export default function LoadingScreen({ gameName }) {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.title}>Loading {gameName}</Text>
      <ActivityIndicator
        style={loadingStyles.loadingWheel}
        size="large"
        color={COLORS.lightGreen}
      />
    </View>
  );
}
