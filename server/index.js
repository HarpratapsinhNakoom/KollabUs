// Setup environment variables using dotenv.
const dotenv = require("dotenv");
dotenv.config();

// Create express application.
const express = require("express");
const app = express();

// Connect to remote database.
const DbConnect = require("./database");
DbConnect();

// Setup Socket-IO server.
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Realtime Socket-IO methods.
const registerBoardHandlers = require("./eventHandlers/boardHandler");
const registerDocumentHandlers = require("./eventHandlers/documentHandler");
const registerRoomHandler = require("./eventHandlers/room-handler");

const socketUserMapping = {};
const onConnection = (socket) => {
  registerBoardHandlers(io, socket);
  registerDocumentHandlers(io, socket);
  registerRoomHandler(io, socket, socketUserMapping);
};

io.on("connection", onConnection);

// Set up router.
const cors = require("cors");
app.use(express.json(), cors());
const router = require("./routes");
app.use(router);

// Base Path.
app.get("/", (req, res) => {
  res.status(200).send("Backend is up and running...");
});

// Make available the server over defined port.
const PORT = process.env.PORT || 5501;
server.listen(PORT, () => {
  console.log("listening on *:3001");
});
