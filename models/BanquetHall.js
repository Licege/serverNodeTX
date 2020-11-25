module.exports = (sequelize, DataTypes) => {
  const BanquetHall = sequelize.define(
      'BanquetHall',
      {
        phone: DataTypes.STRING,
        capacity: {
          type: DataTypes.INTEGER,
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        images: DataTypes.ARRAY(DataTypes.STRING),
        restaurantId: DataTypes.INTEGER
      },
      { timestamps: false }
  )

  BanquetHall.associate = models => {
    BanquetHall.hasOne(models.Restaurant, { foreignKey: 'restaurantId', targetKey: 'id' })
  }

  return BanquetHall
}