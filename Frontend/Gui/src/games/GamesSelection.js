import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { Button } from "react-native-elements/dist/buttons/Button";

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
  const renderGame = ({ game }) => {
    const backgroundColor = game.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = game.id === selectedId ? "white" : "black";

    return (
      <GameButton
        game={game}
        onPress={() => {
          setSelectedId(game.id);
          // navigation.navigate(game.id, {});
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <FlatList
      data={GAMES}
      keyExtractor={(item) => {
        return item.title;
        // return index.toString();
      }}
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
      keyExtractor={(game) => game.id}
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

// buttonStyle={{
//   backgroundColor: "rgba(111, 202, 186, 1)",
//   borderRadius: 30,
// }}
// titleStyle={{ fontWeight: "bold", fontSize: 23 }}
// containerStyle={{
//   marginHorizontal: 50,
//   height: 50,
//   width: 200,
//   marginVertical: 10,
// }}

export default GameSelection;
