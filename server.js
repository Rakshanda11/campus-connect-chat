const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const messageRouter = require("./routers/messageRouter");
const chat = require("./socket/chat");
const cors = require("cors");

const corsOptions = {
  origin: "*:*",
};

const app = express();
app.use(messageRouter);
app.use(cors(corsOptions));
// app.options('*', cors())
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3100 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

chat(io);
