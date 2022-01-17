import { StatusBar } from "expo-status-bar";

import { StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/login/Login";
import MainMenu from "./src/screens/mainMenu/MainMenu";
import Setting from "./src/screens/setting/Setting";
import AppHeader from "./src/components/AppHeader";

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: ({ navigation }) => (
            <AppHeader navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen name="MainMenu" component={MainMenu} title="menu" />
      <Stack.Screen name="Setting" component={Setting} title="setting" />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      {/* <AppHeader /> */}
      <StackScreen />
      <StatusBar hidden={true} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
