const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let room = null;

  socket.on('join', (roomId) => {
    room = roomId;
    socket.join(room);
  });

  socket.on('message', (msg) => {
    if (room) {
      socket.to(room).emit('message', msg);
    }
  });

  socket.on('disconnect', () => {
    if (room) socket.leave(room);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on http://localhost:3000');
});
