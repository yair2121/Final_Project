import { Platform } from "react-native";

export function isMobilePlatform() {
  // Might not be needed.
  return Platform.OS === "android" || Platform.OS === "ios";
}
