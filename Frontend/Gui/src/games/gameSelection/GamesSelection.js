import React, { useState, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";

import { Text } from "react-native-elements";

import GAMES from "../gamesArray";
import { gameSelectionStyles } from "./gameSelectionStyles";

/*
Game selection button component.
*/
const GameButton = ({ item, navigation }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => {
      navigation.navigate("GameScreen", { title: item.title });
    }}
    style={gameSelectionStyles.button}
  >
    <Text style={gameSelectionStyles.gameTitle}>{item.title}</Text>
  </TouchableOpacity>
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
