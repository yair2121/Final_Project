const { io } = require("socket.io-client");
import { createContext } from "react";
//import { SOCKET_URL } from "config";

export const socket = io("http://192.168.0.185:3000");
socket.connect();
export const SocketContext = createContext(null);
