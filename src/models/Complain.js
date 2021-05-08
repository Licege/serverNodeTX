module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define(
    'Complain',
    {
      typeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ComplainTypes',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitDate: DataTypes.DATE,
      text: DataTypes.TEXT
    }
  );

  Complain.associate = models => {
    Complain.belongsTo(models.ComplainType, {foreignKey: 'typeId', targetKey: 'id'});
    Complain.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
  };

  return Complain;
};