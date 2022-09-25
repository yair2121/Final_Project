import React, { useContext, useState } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_ID, SESSION_STATE } from "../../constants/keys";
const emptyJSON = JSON.stringify({});
import { Button } from "react-native-elements";
import { View } from "react-native";

import { useEffect } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import GAMES from "../../games/gamesArray";
import { COLORS } from "../../constants/colors";
import { gameScreenStyles } from "./gameScreenStyles";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundStyle } from "../../constants/backgroundStyle";

/*
  Handle all the ui of a game.
  Wraps the game view.
  Handle the loading screen.
  Handle connection to the server game room.
 */
export default function GameScreen({ route }) {
  const socket = useContext(SocketContext);
  const [initialState, setInitialState] = useState(null);

  const { GameView, title } = GAMES.find(
    (game) => game.title === route.params.title
  );
  const [isLoading, setIsLoading] = useState(true);
  // Connects to game. When game starts stop loading.
  useEffect(() => {
    socket.on("Session started", (game_state, s_id) => {
      AsyncStorage.setItem(SESSION_ID, s_id);
      setInitialState(game_state);
      setIsLoading(false);
    });
    socket.emit("connect_to_game", title, (callback) => {
      AsyncStorage.setItem(SESSION_ID, callback.s_id);
      if (JSON.stringify(callback.game_state) != emptyJSON) {
        setInitialState(callback.game_state);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <LinearGradient colors={COLORS.background} style={backgroundStyle}>
      <View style={gameScreenStyles.container}>
        <View style={gameScreenStyles.contentBox}>
          {isLoading && <LoadingScreen gameName={title} />}
          {!isLoading && <GameView initial_state={initialState} />}
        </View>
        {/* <Button
          title="toggle"
          onPress={() => {
            setIsLoading(!isLoading);
          }}
        /> */}
      </View>
    </LinearGradient>
  );
}
