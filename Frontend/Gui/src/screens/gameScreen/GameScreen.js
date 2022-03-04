import React, { useState } from "react";
import { Text, View } from "react-native";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Button } from "react-native-elements";

export default function GameScreen({ route, navigation }) {
  const { GameView, title } = GAMES.find(
    (game) => game.title === route.params.title
  );
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View>
      {isLoading && <LoadingScreen gameName={title} />}
      {!isLoading && <GameView />}
      <Button
        title="toggle"
        onPress={() => {
          setIsLoading(!isLoading);
        }}
      />
    </View>
  );
  // return <View>{props.gameview}</View>;
}
