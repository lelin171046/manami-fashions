import { Server } from "socket.io";
import { verifyAccessToken } from "./services/auth.service.js";
import { Admin } from "./models/index.js";
import { FRONTEND_URL } from "./config/env.js";

let io = null;

const getTokenFromCookie = (socket) => {
  const cookieHeader = socket.handshake.headers.cookie || "";
  const cookie = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("accessToken="));
  return cookie ? cookie.slice("accessToken=".length) : null;
};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || getTokenFromCookie(socket);
      if (!token) throw new Error("Not authenticated");

      const decoded = verifyAccessToken(token);
      const admin = await Admin.findById(decoded.id);
      if (!admin || !admin.isActive) throw new Error("Unauthorized");

      socket.admin = admin;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.join("admins");
    socket.on("disconnect", () => {});
  });

  return io;
};

export const getIO = () => io;

export const emitContactNew = (contact) => {
  io?.to("admins").emit("contact:new", contact);
};

export const emitContactUpdated = (contact) => {
  io?.to("admins").emit("contact:updated", contact);
};
