import React, { useContext, useEffect, useState } from "react";

import { Input } from "react-native-elements";

import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import logo from "../../../assets/logo/controllerLogo.png";
import uuid from "react-native-uuid";
import { COLORS } from "../../constants/colors";
// import { UserContext } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";
// export const UserContext = React.createContext();

export default function LoginScreen({ navigation }) {
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  const LoginButton = () => {
    const [name, setName] = useState("");
    useEffect(() => {
      (async () => {
        setName(JSON.parse(await AsyncStorage.getItem(USER_KEY)).name);
      })();
    }, []);

    return (
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          if (playerName) {
            await AsyncStorage.setItem(
              USER_KEY,
              JSON.stringify({
                id: uuid.v1(),
                name: playerName,
              })
            );
            navigation.navigate("MainMenu", {});
          }
        }}
      >
        <Text style={styles.TextInput}>LOGIN {JSON.stringify(name)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    // <UserContext.Provider value={playerInfo}>
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.inputView}>
        <Input
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
