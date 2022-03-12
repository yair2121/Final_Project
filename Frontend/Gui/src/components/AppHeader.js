import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Header, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../constants/keys";

export default function AppHeader({ navigation, route }) {
  // const playerName = navigation.getParam("playerName", false)
  const [playerName, setPlayerName] = useState();
  // text: route.params.playerName ? route.params.playerName : "",
  return (
    <Header
      containerStyle={styles.container}
      backgroundColor="black"
      backgroundImageStyle={{ flex: 1 }}
      barStyle="default"
      centerComponent={{
        text:
          playerName in route.params.playerName &&
          route.params.playerName.toString(),
        style: styles.heading,
      }}
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
        <FontAwesome
          rendered="#{false}"
          name="sign-out"
          size={24}
          color="#fff"
          onPress={() => {
            navigation.navigate("LoginScreen", {});
          }}
        />
      }
    />
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.25,
    borderBottomColor: "black",
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
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
