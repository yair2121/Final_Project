import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Input, Text, Button } from "react-native-elements";
import { SocketContext } from "../../contexts/SocketContext";
import { USER_KEY, SESSION_ID, SESSION_STATE } from "../../constants/keys";
import { COLORS } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

//// TODO split gamestate into many state variables ):
//const PlayersNames = [];
export default function SumGame({ initial_state }) {
  const socket = useContext(SocketContext);
  const [stateplayers, setPlayers] = useState(initial_state.players);
  const [statesum, setSum] = useState(initial_state.sum);
  const [stateplayerturn, setPlayerTurn] = useState(initial_state.player_turn);
  const [player, setPlayer] = useState({});
  const [playerMove, setPlayerMove] = useState(0);
  const [sessionId, setSessionId] = useState("");
  var clientplayerindex = -1;
  for (var index = 0; index < stateplayers.length; index++) {
    if (stateplayers[index].id == player.id) {
      clientplayerindex = index;
      break;
    }
  }
  function setGameState(state) {
    players_changed = false;
    if (state.players.length == stateplayers.length) {
      for (var i = 0; i < stateplayers.length; i++) {
        if (stateplayers[i].id != state.players[i].id) {
          players_changed = true;
          break;
        }
      }
    } else {
      players_changed = true;
    }
    if (players_changed) {
      setPlayers(state.players);
    }
    if (state.sum != statesum) {
      setSum(state.sum);
    }
    if (stateplayerturn != state.player_turn) {
      setPlayerTurn(state.player_turn);
    }
  }

  function getGameState() {
    return Object.assign(
      {},
      { players: stateplayers, sum: statesum, player_turn: stateplayerturn }
    );
  }
  // const [playerTurn, setPlayerTurn] = useState(PlayersNames[0].key);
  // const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then((item) => {
      setPlayer(JSON.parse(item));
      console.log(item);
    });
    AsyncStorage.getItem(SESSION_ID).then((item) => {
      setSessionId(item);
    });
    socket.on("Update state", (game_state, s_id) => {
      console.log("got state");
      setGameState(game_state);
    });

    socket.on("Update move", (move_desc, s_id) => {
      console.log("update move");
      console.log(statesum);
      setSum(statesum + move_desc.number);
      console.log(statesum);
      setPlayerTurn((stateplayerturn + 1) % stateplayers.length);
    });
    for (var index = 0; index < stateplayers.length; index++) {
      if (stateplayers[index].id == player.id) {
        clientplayerindex = index;
        break;
      }
    }
  }, []);

  function isMyTurn() {
    try {
      var currplayer = stateplayers[stateplayerturn];
      return currplayer.id == player.id && currplayer.name == player.name;
    } catch {
      return false;
    }
  }
  function makeMove() {
    socket.emit("update_move", "Sum Game", sessionId, {
      number: playerMove,
      player: clientplayerindex,
    });
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
          disabled={stateplayerturn != clientplayerindex}
          title="Add your number"
          onPress={() => makeMove()}
        />
      </View>
      <FlatList
        data={stateplayers}
        renderItem={({ item, index }) => (
          <View keyExtractor={(item) => item.id}>
            <Text
              style={{
                color: stateplayerturn === index ? "red" : "black",
              }}
            >
              Name: {item.name}
            </Text>
          </View>
        )}
      />
      <Text>Total Sum: {statesum}</Text>
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
