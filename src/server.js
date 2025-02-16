require('dotenv').config();  // Carregar variáveis do .env
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/purchaseRoutes');  // Corrigido o nome da variável para purchaseRoutes

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Handlebars
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main', // Certifique-se de que a configuração está correta
  layoutsDir: path.join(__dirname, 'views', 'layouts'), // Define onde estão os layouts
  helpers: {
    multiply: (a, b) => a * b
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Rotas
app.use('/auth', authRoutes);  // Rota de autenticação
app.use('/', ticketRoutes);    // Rota de vendas, corrigida para usar 'ticketRoutes'

// Conexão com o banco de dados e inicialização do servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
};

startServer();
