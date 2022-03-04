import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import settingIMG from "../../assets/icons/setting.png";
import { Button, Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

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
