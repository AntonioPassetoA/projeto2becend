exports.isAdmin = (req, res, next) => {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }
  next(); // Se for administrador, permite o acesso
};
