import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { SocketContext } from "../../contexts/SocketContext";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_ID, SESSION_STATE } from "../../constants/keys";

export default function GameScreen({ route, navigation }) {
  const socket = useContext(SocketContext);
  const { GameView, title } = GAMES.find(
    (game) => game.title === route.params.title
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on("Session started", (game_state, s_id) => {
      console.log(game_state);
      AsyncStorage.setItem(SESSION_STATE, JSON.stringify(game_state)).then(
        setIsLoading(false)
      );
      AsyncStorage.getItem(SESSION_STATE).then((item) => console.log(item));
    });
    socket.emit("connect_to_game", title, (response) => {
      AsyncStorage.setItem(SESSION_ID, response);
    });
  }, []);
  return (
    <View>
      {isLoading && <LoadingScreen gameName={title} />}
      {!isLoading && <GameView />}
    </View>
  );
  // return <View>{props.gameview}</View>;
}
