module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
      'News',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: DataTypes.TEXT,
        shortDescription: DataTypes.TEXT,
        imageSrc: DataTypes.STRING
      }
  )

  return News
}