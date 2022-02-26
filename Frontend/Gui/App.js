import { StatusBar } from "expo-status-bar";

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

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <AppHeader />,
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
    <UserProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {/* <UserContext.Provider value={null}> */}
        <StackScreen />
        {/* </UserContext.Provider> */}
      </NavigationContainer>
    </UserProvider>
  );
}
