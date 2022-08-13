import React, { useContext, useState } from "react";
import { Button, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { SocketContext } from "../../contexts/SocketContext";

import { COLORS } from "../../constants/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";
import { LoginStyles } from "./LoginStyles.js";
import LoginLogo from "./LoginLogo";
import { LANGUAGE } from "../../constants/languageRegex";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  const [playerName, setPlayerName] = useState("");

  /**
   * Handle the logic part of login a user.
   * Asks the server to login with the provided playerName.
   * @param {*} socket
   */
  const login = (socket) => {
    if (playerName) {
      socket.emit("login", playerName, (socketId) => {
        AsyncStorage.setItem(
          USER_KEY,
          JSON.stringify({
            id: socketId,
            name: playerName,
          })
        ).then(() => {
          setPlayerName(playerName);
          navigation.setParams({ playerName: playerName }); // TODO: Maybe delete this.
          navigation.navigate("MainMenu", {});
        });
      });
    }
  };

  /**
   * Login Button component.
   * @returns
   */
  const LoginButton = ({ onLogin }) => {
    const socket = useContext(SocketContext);
    return (
      <TouchableOpacity
        activeOpacity={0.5} // Black cell should not have graphics for responding to touches.
        style={LoginStyles.loginBtnContainer}
      >
        <Text
          type="solid"
          // style={}
          style={LoginStyles.loginText}
          // titleStyle={}
          onPress={() => {
            onLogin(socket);
          }}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={LoginStyles.safeContainer}>
      <View style={LoginStyles.container}>
        <LoginLogo />
        <Input
          value={playerName}
          containerStyle={LoginStyles.inputView}
          inputStyle={LoginStyles.TextInput}
          placeholder="Enter your name"
          onChangeText={(name) => {
            setPlayerName(name); // TODO: check if it's an issue that the name can includes non english letters.
          }}
        ></Input>
        <View style={LoginStyles.space} />
        <LoginButton onLogin={login} />
      </View>
    </SafeAreaView>
  );
}
