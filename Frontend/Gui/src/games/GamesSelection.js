import React, { useState, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import { Button } from "react-native-elements";
import { COLORS } from "../constants/colors";

import GAMES from "./gamesArray";

/*
Game selection button component.
*/
const GameButton = ({ item, navigation }) => (
  <Button
    title={item.title}
    onPress={() => {
      navigation.navigate("GameScreen", { title: item.title });
    }}
    buttonStyle={styles.button}
    titleStyle={styles.gameTitle}
    containerStyle={styles.container}
  ></Button>
);

/*
Render a GameButton per available game.
 */
const GameSelection = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <FlatList
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    height: 50,
    width: 200,
    marginVertical: 10,
    backgroundColor: COLORS.backgroundBlue,
  },
  button: {
    backgroundColor: "rgba(111, 202, 186, 1)",
    borderRadius: 30,
  },
  gameTitle: {
    fontWeight: "bold",
    fontSize: 23,
  },
});

export default GameSelection;
