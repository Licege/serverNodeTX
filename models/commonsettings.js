module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define(
      'CommonSettings',
      {
        city: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmpty: false
          }
        },
        priceForDelivery: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        freeDelivery: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        isDelivery: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      }
  )

  return Settings
}