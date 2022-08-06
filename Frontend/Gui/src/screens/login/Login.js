import React, { useContext, useState, Component } from "react";
import { Button, Input, Text } from "react-native-elements";
import { View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SocketContext } from "../../contexts/SocketContext";

import logo from "../../../assets/logo/controllerLogo.png";
import { COLORS } from "../../constants/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";
import { LoginStyles } from "./LoginStyles.js";

export default function LoginScreen({ navigation }) {
  const [playerName, setPlayerName] = useState("");

  /**
   * Handle the logic part of login a user.
   * Asks the server to login with the provided playerName.
   * @param {*} socket
   */
  const login = (socket) => {
    if (playerName) {
      // socket.emit("login", playerName, (socketId) => {
      //   AsyncStorage.setItem(
      //     USER_KEY,
      //     JSON.stringify({
      //       id: socketId,
      //       name: playerName,
      //     })
      //   ).then(() => {
      setPlayerName(playerName);
      navigation.setParams({ playerName: playerName }); // TODO: Maybe delete this.
      navigation.navigate("MainMenu", {});
      // });
      // });
    }
  };

  /**
   * Login Button component.
   * @returns
   */
  const LoginButton = ({ onLogin }) => {
    const socket = useContext(SocketContext);
    return (
      <Button
        title="LOGIN"
        buttonStyle={LoginStyles.loginBtn}
        titleStyle={LoginStyles.loginText}
        onPress={() => {
          onLogin(socket);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={LoginStyles.container}>
      <Image style={LoginStyles.logo} source={logo} />
      <View style={LoginStyles.inputView}>
        <Input
          value={playerName}
          inputStyle={LoginStyles.inputView}
          placeholder="Enter your name."
          placeholderTextColor={COLORS.black}
          onChangeText={(name) => setPlayerName(name)}
        ></Input>
      </View>
      <LoginButton onLogin={login} />
    </SafeAreaView>
  );
}
