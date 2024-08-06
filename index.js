const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const registerConnectionHandlers = require("./handlers/connectionHandlers");
const registerLobbyHandlers = require("./handlers/lobbyHandlers");

//game handlers
const registerLetrisHandler = require("./handlers/games/letrisHandler");
const registerHackjackHandler = require("./handlers/games/hackjackHandler");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://jimbogames.netlify.app/",
    methods: ["GET", "POST"],
  },
});

const playerIDMap = {};
const roomInfo = {};

io.on("connection", (socket) => {
  console.log("User Connected: " + socket.id);

  const updateRoom = (room) => {
    socket.to(room).emit("room_update", roomInfo[room]);
  }
  
  registerConnectionHandlers(io, socket, roomInfo, playerIDMap, updateRoom);
  registerLobbyHandlers(io, socket, roomInfo, playerIDMap, updateRoom);

  //games
  registerLetrisHandler(io, socket, roomInfo, playerIDMap, updateRoom);
  registerHackjackHandler(io, socket, roomInfo, playerIDMap, updateRoom);
});

server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
