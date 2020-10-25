require('dotenv').config();
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import socketio from 'socket.io';
import createDatabaseConnection from './db/database';
import routes from './routes';

const db = createDatabaseConnection();
const app = express();
const server = new http.Server(app);
const io = socketio.listen(server);

app.use(cors());
app.use(express.json());
app.use('/files',
    express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(routes);

db.start();
server.listen(process.env.PORT || 3333, () => {
  return console.log('Server Started');
});

export default io;
