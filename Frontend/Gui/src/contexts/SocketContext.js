const io = require("socket.io-client");
import { createContext } from "react";
//import { SOCKET_URL } from "config";

export const socket = io.io("192.168.143.229:3000");
export const SocketContext = createContext(null);
