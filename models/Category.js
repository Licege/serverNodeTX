module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
      'Category',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        titleEn: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isDelivery: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        deletedAt: DataTypes.DATE
      }
  )

  Category.associate = models => {
    Category.hasMany(models.Dish, { onDelete: 'CASCADE', foreignKey: 'categoryId' })
  }

  return Category
}