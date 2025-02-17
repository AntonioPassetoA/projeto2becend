// src/models/Purchase.js
module.exports = (sequelize, DataTypes) => {
  
  const Purchase = sequelize.define('Purchase', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'realizada',  // A compra começa como realizada
      allowNull: false
    }
  });
  
  Purchase.associate = (models) => {
    // Relacionando com os ingressos
    Purchase.belongsToMany(models.Ticket, {
      through: models.PurchaseTicket,
      foreignKey: 'purchaseId',
      otherKey: 'ticketId'
    });
  };

  return Purchase;
};
