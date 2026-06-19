import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
  transports: ["websocket"],
});
console.log(
  "🚀 ~ import.meta.env.VITE_SOCKET_URL :",
  import.meta.env.VITE_SOCKET_URL,
);

export default socket;
