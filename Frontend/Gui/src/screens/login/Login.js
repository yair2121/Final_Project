import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { Input } from "react-native-elements";

import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import logo from "../../../assets/logo/controllerLogo.png";
import uuid from "react-native-uuid";
import { COLORS } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";

export default function LoginScreen({ navigation }) {
  const [playerName, setPlayerName] = useState(null);

  const LoginButton = () => {
    const socket = useContext(SocketContext);
    return (
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          if (playerName) {
            socket.emit("LOGIN", playerName);
            await AsyncStorage.setItem(
              USER_KEY,
              JSON.stringify({
                id: uuid.v1(),
                name: playerName,
              })
            ).then(() => {
              setPlayerName("");
            });
            // navigation.setParams({ playerName: playerName });
            navigation.navigate("MainMenu", {});
          }
        }}
      >
        <Text style={styles.TextInput}>LOGIN</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.inputView}>
        <Input
          value={playerName}
          inputStyle={styles.inputView}
          placeholder="Enter your name."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setPlayerName(name)}
        ></Input>
      </View>
      <LoginButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 66,
    height: 58,
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#FF1493",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
});