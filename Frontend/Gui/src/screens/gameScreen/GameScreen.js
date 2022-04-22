import React, { useState } from "react";
import { Text, View } from "react-native";
import GAMES from "../../games/gamesArray";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Button } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

export default function GameScreen({ route, navigation }) {
  const { GameView, title } = GAMES.find(
    (game) => game.title === route.params.title
  );
  const [isLoading, setIsLoading] = useState(true);
  return (
    <SafeAreaView>
      {isLoading && <LoadingScreen gameName={title} />}
      {!isLoading && <GameView />}
      <Button
        title="toggle"
        onPress={() => {
          setIsLoading(!isLoading);
        }}
      />
    </SafeAreaView>
  );
  // return <View>{props.gameview}</View>;
}
