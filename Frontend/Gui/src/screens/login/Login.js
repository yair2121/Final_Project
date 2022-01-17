import React, { useState } from "react";

import { StyleSheet, Button, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import uuid from "react-native-uuid";

export const UserContext = React.createContext();

const test = () => {
  setPlayerId(uuid.v1());
};

export default function LoginScreen({ navigation }) {
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const playerInfo = { id: playerId, name: playerName };

  const NameTextBox = () => {
    return (
      <View style={styles.inputView}>
        <TextInput
          id="hey"
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setPlayerName(name)}
          defaultValue={playerName}
        />
      </View>
    );
  };

  const LoginButton = () => {
    return (
      <Button
        style={styles.loginBtn}
        title="Login"
        onPress={() => {
          if (playerName) {
            setPlayerId(uuid.v1());
            console.log(playerInfo.id);
            console.log(playerInfo.name);
            navigation.navigate("MainMenu", {});
          }
        }}
      />
    );
  };
  return (
    <UserContext.Provider value={playerInfo}>
      <View>
        <View style={styles.inputView}>
          <TextInput
            id="hey"
            style={styles.TextInput}
            placeholder=""
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setPlayerName(name)}
            defaultValue={playerName}
          />
        </View>
        <LoginButton />
        {/* <Button style={styles.loginBtn} title="Login" onPress={log_player} /> */}
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
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
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
