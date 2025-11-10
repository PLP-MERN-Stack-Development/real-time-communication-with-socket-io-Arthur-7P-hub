// server.js - Socket.io Chat Server
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load .env variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data
const users = {};
const messages = [];
const typingUsers = {};

// Socket events
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
  });

  socket.on('send_message', (data) => {
    const message = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      message: data.message,
      timestamp: new Date().toISOString(),
    };
    messages.push(message);
    io.emit('receive_message', message);
  });

  socket.on('typing', (isTyping) => {
    const username = users[socket.id]?.username;
    if (!username) return;
    if (isTyping) typingUsers[socket.id] = username;
    else delete typingUsers[socket.id];
    io.emit('typing_users', Object.values(typingUsers));
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('user_left', user);
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
      console.log('❌ User disconnected:', user.username);
    }
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
