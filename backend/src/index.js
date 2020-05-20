const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const server = http.Server(app);

const io = socketio(server);

mongoose.connect('mongodb+srv://davi:davi@cluster0-wtj9f.gcp.mongodb.net/instagram?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(routes);

server.listen(3333, () => {
  console.log('Server started on port 3333');
});