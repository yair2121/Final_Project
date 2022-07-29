// Not implemented yet- currently just rotating circle.
import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
export default function LoadingScreen({ gameName }) {
  return (
    <View>
      <Text>Loading {gameName}</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
