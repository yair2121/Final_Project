import { StatusBar } from "expo-status-bar";
import { SocketContext, socket } from "./src/contexts/SocketContext";
import {
  StyleSheet,
  Button,
  View,
  Platform,
  StatusBar as SB,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LoginScreen,
  MainMenu,
  Setting,
  AppHeader,
  GameScreen,
} from "./src/screens";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "./src/screens/login/Login";
import { UserProvider } from "./src/contexts/UserContext";
import { TITLES } from "./src/constants/titles";

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route }) => {
          return <AppHeader navigation={navigation} route={route} />;
        },
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainMenu" component={MainMenu} title="menu" />
      <Stack.Screen name="Setting" component={Setting} title="setting" />
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        title="Game view"
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer
        documentTitle={{
          formatter: (options, route) => TITLES.appName,
        }}
      >
        <StatusBar hidden={true} />
        <StackScreen />
      </NavigationContainer>
    </SocketContext.Provider>
  );
}