module.exports = (sequelize, DataTypes) => {
    const PurchaseTicket = sequelize.define('PurchaseTicket', {
      purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Purchases',
          key: 'id',
        },
      },
      ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tickets',
          key: 'id',
        },
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  
    return PurchaseTicket;
  };