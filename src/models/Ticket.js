// src/models/Purchase.js
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Purchase;
};

// src/models/Ticket.js
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantidadeDisponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Ticket.associate = (models) => {
    Ticket.belongsToMany(models.Purchase, {
      through: models.PurchaseTicket,
      foreignKey: 'ticketId',
      otherKey: 'purchaseId',
    });
    
  };
  return Ticket;
}
 

