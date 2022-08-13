import { Platform } from "react-native";

export const isMobilePlatform =
  Platform.OS === "android" || Platform.OS === "ios";
// export function isMobilePlatform() {
//   // Might not be needed.
//   return Platform.OS === "android" || Platform.OS === "ios";
// }
