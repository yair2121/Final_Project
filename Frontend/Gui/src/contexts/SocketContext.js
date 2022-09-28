const { io } = require("socket.io-client");
import { createContext } from "react";
const PORT = "3000"; //port
const SOCKET_URL = "http://localhost:" + PORT; //url where server is hosted
export const socket = io(SOCKET_URL);
socket.connect();
export const SocketContext = createContext(null);
