import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { socketAuthMiddleware } from './socketAuth.middleware';

export let io: SocketIOServer;

export const initializeSocket = (httpServer: HTTPServer, origin: string): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    transports: ['websocket', 'polling'],
  });

  io.use(socketAuthMiddleware);

  io.on('connection', (socket) => {
    const userId = socket.data.userId as string;
    socket.join(userId);
  });

  return io;
};

export const emitToUser = (userId: string, event: string, data: unknown) => {
  io.to(userId).emit(event, data);
};
