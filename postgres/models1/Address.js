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
        }
    )

    Address.associate = models => {
        Address.belongsTo(models.User, { foreignKey: 'id', targetKey: 'addressId' })
        Address.belongsTo(models.Delivery, { foreignKey: 'id', targetKey: 'addressId' })
        Address.belongsTo(models.Restaurant, { foreignKey: 'id', targetKey: 'addressId' })
    }

    return Address
}