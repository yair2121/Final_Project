import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Text, Button } from "react-native-elements";
import uuid from "react-native-uuid";

import { USER_KEY } from "../../constants/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/colors";

const PlayersNames = [
  { key: uuid.v1(), name: "Avital" },
  { key: uuid.v1(), name: "Roey" },
  { key: uuid.v1(), name: "Dudi" },
  { key: uuid.v1(), name: "Yair" },
];

export default function SumGame({ navigation }) {
  const [player, setPlayer] = useState({});
  const [playerTurn, setPlayerTurn] = useState(PlayersNames[0].key);
  const [playerMove, setPlayerMove] = useState(null);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then((item) => {
      setPlayer(JSON.parse(item));
    });
  }, []);
  function isMyTurn() {
    if (player.id) return playerTurn === player.id;
  }
  function makeMove() {
    playerMove && console.log(playerMove);
  }
  return (
    <View>
      <View>
        <Input
          value={playerMove}
          keyboardType="numeric"
          inputStyle={styles.inputView}
          placeholder="Enter your number."
          placeholderTextColor="#003f5c"
          onChangeText={(value) => setPlayerMove(value.replace(/[^0-9]/g, ""))}
        ></Input>
        <Button
          disabled={isMyTurn()}
          title="Add your number"
          onPress={() => makeMove()}
        />
      </View>
      <FlatList
        data={PlayersNames}
        renderItem={({ item }) => (
          <View keyExtractor={(item) => item.key}>
            <Text style={{ color: playerTurn === item.key ? "red" : "black" }}>
              Name: {item.name}, Latest move: {0}
            </Text>
          </View>
        )}
      />
      <Text>Total Sum: {totalSum}</Text>
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
