import { Socket } from 'socket.io';
import { verifyToken } from '@/utils/token.util';

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token as string;

    if (!token) {
      return next(new Error('Authentication token required'));
    }

    const payload = verifyToken(token);
    socket.data.userId = payload.userId;
    socket.data.email = payload.email;

    next();
  } catch (error) {
    next(new Error('Invalid or expired token'));
  }
};
