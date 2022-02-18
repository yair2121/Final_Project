import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import settingIMG from "../../assets/icons/setting.png";

export default function AppHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log(navigation);
          navigation.navigate("Setting", {});
        }}
      >
        <Image
          source={settingIMG}
          resizeMode="contain"
          style={styles.settingButton}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  settingButton: {
    width: 46,
    height: 38,
    marginTop: 10,
    marginBottom: 10,
  },
});
