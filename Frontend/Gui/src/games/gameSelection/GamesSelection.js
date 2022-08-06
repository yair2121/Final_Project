import React, { useState, useContext } from "react";
import { View } from "react-native";
import { FlatList } from "react-native";

import { Button } from "react-native-elements";

import GAMES from "../gamesArray";
import { gameSelectionStyles } from "./gameSelectionStyles";

/*
Game selection button component.
*/
const GameButton = ({ item, navigation }) => (
  <Button
    title={item.title}
    onPress={() => {
      navigation.navigate("GameScreen", { title: item.title });
    }}
    buttonStyle={gameSelectionStyles.button}
    titleStyle={gameSelectionStyles.gameTitle}
    // containerStyle={gameSelectionStyles.container}
  ></Button>
);

/*
Render a GameButton per available game.
 */
const GameSelection = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <FlatList
      style={gameSelectionStyles.list}
      scrollEnabled={false}
      data={GAMES}
      renderItem={({ item }) => (
        <GameButton item={item} navigation={navigation} />
      )}
      keyExtractor={(game) => game.key}
      extraData={selectedId}
    />
  );
};

export default GameSelection;
