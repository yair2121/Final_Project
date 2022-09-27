const { io } = require("socket.io-client");
import { createContext } from "react";
import { SOCKET_URL } from "../../../../changeme";
export const socket = io(SOCKET_URL);
socket.connect();
export const SocketContext = createContext(null);
