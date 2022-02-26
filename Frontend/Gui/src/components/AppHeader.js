import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import settingIMG from "../../assets/icons/setting.png";
import { Button, Image } from "react-native-elements";

export default function AppHeader() {
  const navigation = useNavigation();
  return (
    <Header
      containerStyle={styles.container}
      backgroundColor="black"
      backgroundImageStyle={{ flex: 1 }}
      barStyle="default"
      leftComponent={
        <Icon
          name="arrow-back"
          color="#fff"
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}
        />
      }
      leftContainerStyle={{}}
      placement="center"
      rightComponent={
        <TouchableOpacity
          onPress={() => {
            console.log(navigation);
            navigation.navigate("Setting", {});
          }}
        >
          <Icon name="settings" color="#fff" />
        </TouchableOpacity>
      }
    />
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.25,
    borderBottomColor: "black",
  },
  settingButton: {
    width: 46,
    height: 38,
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    justifyContent: "flex-start",
    width: 46,
    height: 38,
    marginTop: 10,
    marginBottom: 10,
  },
});
