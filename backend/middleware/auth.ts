import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  }
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'sua-chave-secreta';
    const decoded = jwt.verify(token, secret) as { id: string | number };
    req.user = { id: typeof decoded.id === 'string' ? parseInt(decoded.id) : decoded.id };
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}; 