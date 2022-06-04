import React, { useContext, useState } from "react";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_ID, SESSION_STATE } from "../../constants/keys";
const emptyjson = JSON.stringify({});
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
// const SCREENSIZE = Dimensions.get("screen");

import { Text } from "react-native-elements";
import { useEffect } from "react";
import { SocketContext } from "../../contexts/SocketContext";
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
    <SafeAreaView style={styles.container}>
      {/* {isLoading && <LoadingScreen gameName={title} />} */}
      <View style={styles.contentBox}>
        {isLoading && <LoadingScreen gameName={title} />}
        {!isLoading && <GameView initial_state={initial_state} />}
      </View>

      <Button
        title="toggle"
        onPress={() => {
          setIsLoading(!isLoading);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  contentBox: {
    // alignItems: "center",
    // backgroundColor: "white",
    // width: SCREENSIZE.width * 0.8,
    flex: 1,
    // aspectRatio: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    alignSelf: "center",
  },
});
