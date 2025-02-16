module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Certifique-se de que o e-mail seja único
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return User;
};
