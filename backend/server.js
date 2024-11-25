const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['http://10.0.0.114:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rotas de usuários
app.post('/api/register', async (req, res) => {
  console.log('=== Início do processamento de registro ===');
  console.log('Headers recebidos:', req.headers);
  console.log('Corpo da requisição:', req.body);
  
  try {
    const { name, email, password } = req.body;
    
    // Validação dos campos
    if (!name || !email || !password) {
      console.log('Erro: Campos faltando:', { name, email, password });
      return res.status(400).json({ 
        message: 'Todos os campos são obrigatórios',
        received: { name, email, hasPassword: !!password }
      });
    }

    // Simula criação bem-sucedida
    console.log('Registro bem-sucedido para:', email);
    res.status(201).json({ 
      message: 'Usuário criado com sucesso',
      user: { name, email }
    });
    
  } catch (error) {
    console.error('Erro no processamento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
  
  console.log('=== Fim do processamento de registro ===');
});

// Rota de teste simples para verificar se o servidor está respondendo
app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando!' });
});

// Rota de login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    res.json({ 
      message: 'Login realizado com sucesso',
      token: 'token-teste' 
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

const PORT = 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});