const { io } = require("socket.io-client");
import { createContext } from "react";
//import { SOCKET_URL } from "config";

export const socket = io("http://10.100.102.17:3000");
socket.connect();
export const SocketContext = createContext(null);
