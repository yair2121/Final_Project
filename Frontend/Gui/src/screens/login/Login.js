import React, { useState } from "react";

import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import logo from "../../../assets/logo/controllerLogo.png";
import uuid from "react-native-uuid";
import { COLORS } from "../../constants/colors";

export const UserContext = React.createContext();

export default function LoginScreen({ navigation }) {
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const playerInfo = { id: playerId, name: playerName };

  const LoginButton = () => {
    return (
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (playerName) {
            setPlayerId(uuid.v1());
            console.log(playerInfo.id);
            console.log(playerInfo.name);
            navigation.navigate("MainMenu", {});
          }
        }}
      >
        <Text style={styles.TextInput}>LOGIN</Text>
      </TouchableOpacity>
    );
  };
  return (
    <UserContext.Provider value={playerInfo}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.inputView}>
          <TextInput
            id="hey"
            style={styles.TextInput}
            placeholder="Enter your name."
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

// const NameTextBox = () => {
//   return (
//     <View style={styles.inputView}>
//       <TextInput
//         id="hey"
//         style={styles.TextInput}
//         placeholder="Enter your name."
//         placeholderTextColor="#003f5c"
//         onChangeText={(name) => setPlayerName(name)}
//         defaultValue={playerName}
//       />
//     </View>
//   );
// };
