import { View, Text, Platform } from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import Keyboard from "../../components/Keyboard";
import SafeAreaView from "react-native-safe-area-view";
import { useEffect } from "react";
import { FlatList } from "react-native";

function isMobilePlatform() {
  return Platform.OS === "android" || Platform.OS == "ios";
}

const CELLS = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }];
export default function Crossword({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CROSSWORD</Text>

      <View style={styles.map}>
        <View style={styles.row}>
          <FlatList
            data={CELLS}
            renderItem={({ item }) => <View style={styles.cell}></View>}
            keyExtractor={(item) => item.key}
            // extraData={selectedId}
          />
        </View>
      </View>

      {isMobilePlatform() && <Keyboard />}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundBlue,
    alignItems: "center",
  },
  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    backgroundColor: "white",
    alignSelf: "stretch",
    height: 100,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 0.6,
    backgroundColor: "white", // TODO: make dynmaic based on cell status(occupied or not and if occupied then color should be the same as the player color)
    flex: 1,
    aspectRatio: 1,
    maxWidth: "100%",
    // margin: 0.5,
  },
};
// <View style={styles.cell}></View>;
