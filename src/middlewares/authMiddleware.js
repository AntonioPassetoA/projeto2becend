const jwt = require('jsonwebtoken');

// Middleware de autenticação
exports.authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;  // Verificando o token nos cookies

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado, por favor faça login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decodificando o token
    req.user = decoded;  // Armazenando os dados do usuário no request
    next();  // Continua para a próxima rota
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

// Middleware para verificar se o usuário é administrador
exports.isAdmin = (req, res, next) => {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }
  next(); // Se for administrador, permite o acesso
};

const jwt = require('jsonwebtoken');

// Middleware para verificar a autenticação
exports.authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado, por favor faça login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();  // Se estiver autenticado, avança para a próxima rota
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

