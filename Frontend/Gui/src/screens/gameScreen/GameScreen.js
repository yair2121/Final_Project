import React from "react";
import { Text, View } from "react-native";
import GAMES from "../../games/gamesArray";
export default function GameScreen({ route, navigation }) {
  const { GameView } = GAMES.find((game) => game.title === route.params.title);
  return (
    <View>
      <GameView />
      {/* <Text>Hello</Text> */}
    </View>
  );
  // return <View>{props.gameview}</View>;
}
