module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define(
      'GlobalSettings',
      {
        isDeliveryWorking: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmpty: false
          }
        },
        paymentCash: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        paymentCashless: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        paymentOnline: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        saleForPickup: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
      },
      { timestamps: false }
  )

  return Settings
}