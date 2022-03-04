import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useMemo, useState } from "react";
import { USER_KEY } from "../constants/keys";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useMemo(async () => {
  //   const userData = await AsyncStorage.getItem(USER_KEY);
  // }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
