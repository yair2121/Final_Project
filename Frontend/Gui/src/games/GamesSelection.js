import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { Button } from "react-native-elements";
import { COLORS } from "../constants/colors";

import GAMES from "./gamesArray";

const GameButton = ({ game, onPress, backgroundColor, textColor }) => (
  <Button
    onPress={onPress}
    buttonStyle={[styles.item, backgroundColor]}
    titleStyle={(styles.title, textColor)}
    title={game.title}
  ></Button>
);

const GameSelection = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <FlatList
      data={GAMES}
      renderItem={({ item }) => (
        <Button
          title={item.title}
          onPress={() => {
            navigation.navigate("GameScreen", { title: item.title });
          }}
          buttonStyle={styles.button}
          titleStyle={styles.gameTitle}
          containerStyle={styles.container}
        ></Button>
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
