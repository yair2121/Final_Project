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
import { TITLES } from "./src/constants/titles";

const headerOption = {
  showBack: false,
  showSignOut: false,
  showExitGame: false,
};
const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade",
        testProp: false,
        header: ({ navigation, route }) => {
          return <AppHeader navigation={navigation} route={route} />;
        },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        initialParams={Object.assign(headerOption)}
      />
      <Stack.Screen
        name="MainMenu"
        component={MainMenu}
        initialParams={headerOption}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        initialParams={headerOption}
      />
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        initialParams={headerOption}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <UserProvider>
      <NavigationContainer
        documentTitle={{
          formatter: (options, route) => TITLES.appName,
        }}
      >
        <StatusBar hidden={false} />
        <StackScreen />
      </NavigationContainer>
    </UserProvider>
  );
}
