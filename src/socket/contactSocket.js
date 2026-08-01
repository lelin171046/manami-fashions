import { io } from "socket.io-client";

let socket = null;

export const connectContactSocket = () => {
  if (socket?.connected) return socket;

  const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;

  socket = io(baseUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  return socket;
};

export const disconnectContactSocket = () => {
  socket?.disconnect();
  socket = null;
};

export const getContactSocket = () => socket;
