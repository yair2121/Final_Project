import React, { useContext, useState } from "react";
import { Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";
import { LoginStyles } from "./LoginStyles.js";
import LoginLogo from "./LoginLogo";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { backgroundStyle } from "../../constants/backgroundStyle";
import { SocketContext } from "../../contexts/SocketContext";
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
        onPress={() => {
          onLogin(socket);
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          numberOfLine={1}
          type="solid"
          style={LoginStyles.loginText}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <LinearGradient colors={COLORS.background} style={backgroundStyle}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <SafeAreaView style={LoginStyles.safeContainer}>
          {/* <View style={LoginStyles.container}> */}
          <LoginLogo />
          {/* <View style={LoginStyles.inputView}> */}
          <Input
            value={playerName}
            inputContainerStyle={LoginStyles.inputView}
            // containerStyle={}
            style={LoginStyles.TextInput}
            placeholder="Enter your name"
            onChangeText={(name) => {
              setPlayerName(name);
            }}
            allowFontScaling={true}
          ></Input>
          {/* </View> */}
          {/* <View style={LoginStyles.space} /> */}
          <LoginButton onLogin={login} />
          {/* </View> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
