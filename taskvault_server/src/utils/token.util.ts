import jwt from 'jsonwebtoken';
import { envConfig } from '@/config/env';
import { TokenPayload } from '@/types';

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, envConfig.JWT_ACCESS_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, envConfig.JWT_ACCESS_SECRET) as TokenPayload;
};
