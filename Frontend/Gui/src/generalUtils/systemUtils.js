import { Platform } from "react-native";

export const isMobilePlatform =
  Platform.OS === "android" || Platform.OS === "ios";
