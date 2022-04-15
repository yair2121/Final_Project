import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Input, Text, Button } from "react-native-elements";
import { SocketContext } from "../../contexts/SocketContext";
import { USER_KEY, SESSION_ID, SESSION_STATE } from "../../constants/keys";
import { COLORS } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const PlayersNames = [];

export default function SumGame({ navigation, initial_state }) {
  const socket = useContext(SocketContext);
  const [gamestate, setGameState] = useState(
    AsyncStorage.getItem(SESSION_STATE)
  );
  console.log(gamestate);
  const [player, setPlayer] = useState({});
  const [playerMove, setPlayerMove] = useState(0);
  const [sessionId, setSessionId] = useState("");
  // const [playerTurn, setPlayerTurn] = useState(PlayersNames[0].key);
  // const [totalSum, setTotalSum] = useState(0);
  socket.on("Update state", (game_state, s_id) => {
    console.log("got state");
    setGameState(game_state);
    console.log(game_state);
  });

  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then((item) => {
      setPlayer(JSON.parse(item));
    });
    AsyncStorage.getItem(SESSION_ID).then((item) => {
      setSessionId(item);
    });
    AsyncStorage.getItem(SESSION_STATE).then((item) => {
      setGameState(JSON.parse(item));
      console.log(item);
    });
  }, []);

  function isMyTurn() {
    try {
      return (
        JSON.stringify(gamestate.players[gamestate.player_turn]) ==
        JSON.stringify(player)
      );
    } catch {
      return false;
    }
  }
  function makeMove() {
    socket.emit("update_move", "Sum Game", sessionId, playerMove);
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
          disabled={!isMyTurn()}
          title="Add your number"
          onPress={() => makeMove()}
        />
      </View>
      <FlatList
        data={gamestate.players}
        renderItem={({ item }) => (
          <View keyExtractor={(item) => item.key}>
            <Text
              style={{
                color: gamestate.player_turn === item.key ? "red" : "black",
              }}
            >
              Name: {item.name}, Latest move: {0}
            </Text>
          </View>
        )}
      />
      <Text>Total Sum: {gamestate.sum}</Text>
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
