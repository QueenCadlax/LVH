import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'lowveldhub-super-secret-key-change-in-production';

export interface TokenPayload {
  id: number;
  email: string;
}

export const signToken = (payload: TokenPayload, expiresIn: string | number = '30d'): string => {
  const options: any = {};
  if (expiresIn) {
    options.expiresIn = expiresIn;
  }
  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload | null;
  } catch (error) {
    return null;
  }
};
