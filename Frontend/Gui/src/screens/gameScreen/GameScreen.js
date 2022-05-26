import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { SocketContext } from "../../contexts/SocketContext";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_ID, SESSION_STATE } from "../../constants/keys";
const emptyjson = JSON.stringify({});
export default function GameScreen({ route, navigation }) {
  const socket = useContext(SocketContext);
  const [initial_state, setInitialState] = useState(null);
  const { GameView, title } = GAMES.find(
    (game) => game.title === route.params.title
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on("Session started", (game_state, s_id) => {
      console.log(game_state);
      AsyncStorage.setItem(SESSION_ID, s_id);
      setInitialState(game_state);
      setIsLoading(false);
    });
    socket.emit("connect_to_game", title, (callback) => {
      AsyncStorage.setItem(SESSION_ID, callback.s_id);
      if (JSON.stringify(callback.game_state) != emptyjson) {
        setInitialState(callback.game_state);
        setIsLoading(false);
      }
      // if (JSON.stringify(callback.game_state) != emptyjson) {
      //   AsyncStorage.setItem(
      //     SESSION_STATE,
      //     JSON.stringify(callback.game_state)
      //   );
      //   AsyncStorage.getItem(SESSION_STATE).then((item) => {
      //     console.log(item);
      //     setIsLoading(false);
      //   });
      // }
    });
  }, []);
  return (
    <View>
      {isLoading && <LoadingScreen gameName={title} />}
      {!isLoading && <GameView initial_state={initial_state} />}
    </View>
  );
  // return <View>{props.gameview}</View>;
}
