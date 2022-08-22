const io = require("socket.io-client");
import { createContext } from "react";
//import { SOCKET_URL } from "config";

export const socket = io.io();
console.log("SOCKETCONTEXT");
console.log(socket);
export const SocketContext = createContext(null);
