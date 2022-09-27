import { StatusBar } from "expo-status-bar";
import { SocketContext, socket } from "./src/contexts/SocketContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen, MainMenu, AppHeader, GameScreen } from "./src/screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TITLES } from "./src/constants/titles";
import { HEADER_TYPES } from "./src/components/AppHeader/HeaderTypes";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "./src/constants/colors";
import { backgroundStyle } from "./src/constants/backgroundStyle";

const Stack = createNativeStackNavigator();
const StackScreen = function () {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade",
        // contentStyle: { flex: 10 },
        // headerStyle: { flex: 1 },
        header: ({ navigation, route }) => {
          return <AppHeader navigation={navigation} route={route} />;
        },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        initialParams={{}}
      />
      <Stack.Screen name="MainMenu" component={MainMenu} initialParams={{}} />

      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        initialParams={{ header: HEADER_TYPES.GAME }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <SafeAreaProvider>
      <SocketContext.Provider value={socket}>
        <LinearGradient colors={COLORS.background} style={backgroundStyle}>
          <NavigationContainer
            documentTitle={{
              formatter: () => TITLES.appName,
            }}
          >
            <StatusBar hidden={false} />
            <StackScreen />
          </NavigationContainer>
        </LinearGradient>
      </SocketContext.Provider>
    </SafeAreaProvider>
  );
}
