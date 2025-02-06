require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const { resolve } = require('node:path');
const { createServer } = require('http');
const { Server } = require('socket.io');

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/', express.static(resolve(__dirname, '../dist')));

  return app;
}

const app = setupServer();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('panelStatusChange', (status) => {
    let panelStatus = status;
    io.emit('panelStatusUpdate', panelStatus); // 全てのクライアントに状態を通知
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Web server is running on PORT:${PORT}/`);
});