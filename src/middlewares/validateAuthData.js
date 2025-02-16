//validateAuthData.js
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

exports.validateRegisterData = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de e-mail inválido' });
  }

  if (!passwordRegex.test(senha)) {
    return res.status(400).json({
      message: 'A senha deve ter pelo menos 8 caracteres, incluindo letras e números'
    });
  }

  next();
};

exports.validateLoginData = (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de e-mail inválido' });
  }

  next();
};
