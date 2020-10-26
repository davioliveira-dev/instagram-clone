import socketio from 'socket.io-client';
const baseUrl = 'http://localhost:3333';

export const socket:SocketIOClient.Socket = socketio(baseUrl);
