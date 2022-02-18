import { StatusBar } from "expo-status-bar";

import { StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen, MainMenu, Setting, AppHeader } from "./src/screens";
// import { SumGame } from "./src/games";

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <AppHeader />,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainMenu" component={MainMenu} title="menu" />
      <Stack.Screen name="Setting" component={Setting} title="setting" />
      {/* <Stack.Screen name="SumGame" component={SumGame} title="sum game" /> */}
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <StackScreen />
      <StatusBar hidden={false} />
    </NavigationContainer>
  );
}
