import React, { useState } from "react";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { Dimensions, StyleSheet, View } from "react-native";
import { Crossword } from "../../games"; // TODO: remove it after finishing working on crossword
const SCREENSIZE = Dimensions.get("screen");

import { Text } from "react-native-elements";

export default function GameScreen({ route, navigation }) {
  // const { GameView, title } = GAMES.find(
  //   (game) => game.title === route.params.title
  // );
  const [isLoading, setIsLoading] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading && <LoadingScreen gameName={title} />} */}
      {/* <Text style={styles.title}>CROSSWORD</Text> */}
      <View style={styles.contentBox}>
        <Crossword />
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
