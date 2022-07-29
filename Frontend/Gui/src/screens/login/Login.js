import React, { useContext, useState } from "react";
import { Input } from "react-native-elements";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SocketContext } from "../../contexts/SocketContext";

import logo from "../../../assets/logo/controllerLogo.png";
import { COLORS } from "../../constants/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";

export default function LoginScreen({ navigation }) {
  const [playerName, setPlayerName] = useState("");

  const LoginButton = () => {
    const socket = useContext(SocketContext);
    return (
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          // Make sure that the user entered a name.
          if (playerName) {
            // socket.emit("login", playerName, (socketId) => {
            //   AsyncStorage.setItem(
            //     USER_KEY,
            //     JSON.stringify({
            //       id: socketId,
            //       name: playerName,
            //     })
            // ).then(() => {
            setPlayerName(playerName);
            navigation.setParams({ playerName: playerName }); // TODO: Maybe delete this.
            navigation.navigate("MainMenu", {});
            // });
            // });
          }
        }}
      >
        <Text style={styles.TextInput}>LOGIN</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
    backgroundColor: COLORS.pink,
    borderWidth: 0,
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
});
