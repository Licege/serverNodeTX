module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
      'Address',
      {
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        house: DataTypes.STRING,
        flat: DataTypes.STRING,
        floor: DataTypes.STRING,
        intercom: DataTypes.STRING
      },
      { timestamps: false }
  )

  Address.associate = models => {
    Address.belongsTo(models.User, { foreignKey: 'id', targetKey: 'addressId' })
    Address.belongsTo(models.Restaurant, { foreignKey: 'id', targetKey: 'addressId' })
  }

  return Address
}