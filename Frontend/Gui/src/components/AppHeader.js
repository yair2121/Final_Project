import React from "react";
import { View, Text, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function AppHeader() {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="setting"
        onPress={() => {
          console.log(navigation);
          navigation.navigate("Setting", {});
        }}
      />
    </View>
  );
}
{
}
