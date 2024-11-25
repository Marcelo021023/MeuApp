import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      user?: { id: number }
    }
  }
}

router.put(
  '/profile',
  authenticateToken as RequestHandler,
  async (req: Request, res: Response) => {
    try {
      const { nome, email, telefone } = req.body;
      const userId = Number(req.user?.id);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { nome, email, telefone },
      });

      res.json({ 
        user: {
          id: updatedUser.id,
          nome: updatedUser.nome,
          email: updatedUser.email,
          telefone: updatedUser.telefone,
          foto: updatedUser.foto
        } 
      });
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar perfil' });
    }
  }
);

router.post('/api/login', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      },
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}) as RequestHandler);