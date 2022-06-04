import React, { useState } from "react";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Crossword } from "../../games"; // TODO: remove it after finishing working on crossword
// const SCREENSIZE = Dimensions.get("screen");

import { Text } from "react-native-elements";
import { useEffect } from "react";

export default function GameScreen({ route, navigation }) {
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
    <SafeAreaView style={styles.container}>
      {/* {isLoading && <LoadingScreen gameName={title} />} */}
      <View style={styles.contentBox}>
        <GameView />
        {/* {!isLoading && <GameView />} */}
      </View>

      {/* <Button
        title="toggle"
        onPress={() => {
          setIsLoading(!isLoading);
        }}
      /> */}
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
