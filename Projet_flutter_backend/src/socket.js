"use strict";

const { Server } = require("socket.io");

const SOCKET_CORS_ORIGINS = [
  "https://www.crmprobar.com",
  "https://crmprobar.com",
  "https://api.crmprobar.com",
  "http://localhost:4000",
  "http://localhost:57745",
];

let _io = null;

/**
 * Creates the single Socket.IO instance for the process and attaches it to
 * the given HTTP server. Safe to call more than once — later calls just
 * return the existing instance instead of creating a second one.
 */
function initSocket(httpServer) {
  if (_io) {
    console.warn("⚠️ Socket.IO already initialized — reusing existing instance");
    return _io;
  }

  _io = new Server(httpServer, {
    cors: {
      origin: SOCKET_CORS_ORIGINS,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  _io.on("connection", (socket) => {
    // Client joins its own user room so we can target it with server→client events
    socket.on("join", (userId) => {
      if (userId) socket.join(`user:${userId}`);
    });

    socket.on("disconnect", () => {});
  });

  console.log("✅ Socket.IO initialized");
  return _io;
}

/** Returns the singleton Socket.IO instance. Throws if initSocket() hasn't run yet. */
function getIO() {
  if (!_io) throw new Error("Socket.IO not initialized — call initSocket() first");
  return _io;
}

// Emit to a specific user room (no-op if socket not yet initialized)
function emitToUser(userId, event, data) {
  if (!_io) return;
  _io.to(`user:${userId}`).emit(event, data);
}

// Emit to all connected clients in a role room
function emitToRoom(room, event, data) {
  if (!_io) return;
  _io.to(room).emit(event, data);
}

module.exports = {
  initSocket,
  getIO,
  emitToUser,
  emitToRoom,
  // Backward-compatible aliases (previous API names)
  init: initSocket,
  getIo: getIO,
};
