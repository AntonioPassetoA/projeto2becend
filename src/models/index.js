require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
// Conexão com o banco de dados
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  logging: false, // Desativando o log de SQL
});

// Importação dos modelos
const User = require('./User')(sequelize, DataTypes);

const  Purchase = require ('./Purchase')(sequelize , DataTypes);
const Ticket = require ('./Ticket') (sequelize , DataTypes);
const PurchaseTicket = require ('./purchaseTicket') (sequelize , DataTypes);

Ticket.associate({Purchase, PurchaseTicket});

Purchase.associate({Ticket,PurchaseTicket});

// Exportando a conexão e os modelos
module.exports = { sequelize, User , Purchase ,  Ticket, PurchaseTicket};

