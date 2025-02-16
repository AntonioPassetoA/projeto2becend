const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota GET para exibir o formulário de login
router.get('/login', (req, res) => {
  res.render('login');  // Exibe o formulário de login
});

// Rota POST para login
router.post('/login', async (req, res) => {
  try {
    // Tenta fazer login
    const user = await authController.login(req, res);  // Chama a função de login do controlador
    if (user) {
      return res.redirect('/vendas');  // Redireciona para a página de vendas após o login bem-sucedido
    } else {
      return res.render('login', { message: 'E-mail ou senha inválidos.' });  // Exibe uma mensagem de erro caso o login falhe
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login', error);
    return res.render('login', { message: 'Erro ao tentar fazer login.' });
  }
});

// Rota GET para exibir o formulário de cadastro
router.get('/register', (req, res) => {
  res.render('register'); // Exibe o formulário de cadastro
});

// Rota POST para registrar o novo usuário
router.post('/register', async (req, res) => {
  try {
    // Chama a função de registro do controller
    const user = await authController.register(req, res); 
    if (user) {
      return res.redirect('/auth/login');  // Redireciona para o login após o cadastro bem-sucedido
    } else {
      return res.render('register', { message: 'Erro ao cadastrar usuário' });  // Mensagem de erro no cadastro
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário', error);
    return res.render('register', { message: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;
