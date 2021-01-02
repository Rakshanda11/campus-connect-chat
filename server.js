const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const messageRouter = require('./routers/messageRouter');
const socketio = require('socket.io');
const chat = require('./socket/chat');

const app = express();
const jsonParser = bodyParser.json();
const corsOptions = {
  origin: "*:*"
}

app.use(jsonParser);
app.use(cors());
app.use(messageRouter);

const server = http.createServer(app);
const io = socketio(server);
chat(io);

const PORT = process.env.PORT || 3001;


server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))