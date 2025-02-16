// src/middlewares/authenticate.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;  // Use a chave secreta do arquivo .env

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  // Tenta pegar o token dos cookies ou do cabeçalho

  if (!token) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });  // Se o token não for encontrado
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;  // Armazena os dados do usuário decodificados no request
    next();  // Chama a próxima função no pipeline (o controlador)
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });  // Caso o token seja inválido ou expirado
  }
};

module.exports = { authenticate };
