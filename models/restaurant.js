module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
      'Restaurant',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        about: DataTypes.TEXT,
        addressId: DataTypes.INTEGER
      }
  )

  Restaurant.associate = models => {
    Restaurant.hasOne(models.Address, { foreignKey: 'addressId', targetKey: 'id' })
    Restaurant.belongsTo(models.BanquetHall, { foreignKey: 'id', targetKey: 'restaurantId' })
  }

  return Restaurant
}