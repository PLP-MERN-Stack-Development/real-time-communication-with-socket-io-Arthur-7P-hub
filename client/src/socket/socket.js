// src/socket/socket.js
import { io } from "socket.io-client";

// create the socket connection
export const socket = io("http://localhost:5000");

// optional: you can later add a hook here if needed
// e.g. export const useSocket = () => socket;
