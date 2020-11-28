module.exports = (sequelize, DataTypes) => {
  const Promo = sequelize.define(
      'Promo',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        shortDescription: DataTypes.TEXT,
        description: DataTypes.TEXT,
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        show: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        imageSrc: DataTypes.STRING
      }
  )

  return Promo
}