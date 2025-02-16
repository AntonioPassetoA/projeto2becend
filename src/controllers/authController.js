const { User } = require('../models');  // Certifique-se de que você está importando o modelo User corretamente
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para registrar o usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado!' });
    }

    // Cria o novo usuário
    const hashedPassword = await bcrypt.hash(senha, 10);  // Criptografando a senha
    const user = await User.create({ nome, email, senha: hashedPassword });

    // Redireciona para a página de login após o cadastro
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
};

// Função para login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });
    }

    // Gerar o token
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Armazenar o token no cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });  // 1 hora de expiração

    res.redirect('/vendas');  // Após o login bem-sucedido, redireciona para a página de vendas
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).json({ message: 'Erro ao tentar fazer login.' });
  }
};
