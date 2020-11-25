module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
      'Review',
      {
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        description: DataTypes.TEXT,
        imageSrc: DataTypes.STRING
      }
  )

  return Review
}