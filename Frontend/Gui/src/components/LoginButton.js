// import { View, Text } from "react-native";
// import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TouchableOpacity } from "react-native";

// export default function LoginButton() {
//   return (
//     <TouchableOpacity
//       style={styles.loginBtn}
//       onPress={async () => {
//         if (playerName) {
//           await AsyncStorage.setItem(
//             USER_KEY,
//             JSON.stringify({
//               id: uuid.v1(),
//               name: playerName,
//             })
//           )
//             .then(() => {
//               navigation.setParams({ playerName: playerName });
//             })
//             .then(() => {
//               setPlayerName("");
//               navigation.navigate("MainMenu", {});
//             });
//         }
//       }}
//     >
//       <Text style={styles.TextInput}>LOGIN</Text>
//     </TouchableOpacity>
//   );
// }
