module.exports = (sequelize, DateTypes) => {
  const Orders = sequelize.define(
      'Orders',
      {
        name: {
          type: DateTypes.STRING,
          allowNull: false
        },
        phone: {
          type: DateTypes.STRING,
          allowNull: false
        },
        countPerson: DateTypes.INTEGER,
        comment: DateTypes.TEXT,
        status: {
          type: DateTypes.INTEGER,
          defaultValue: 0
        }
      }
  )

  Orders.associate = models => {
    Orders.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' })
  }

  return Orders
}