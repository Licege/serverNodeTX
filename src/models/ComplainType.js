module.exports = (sequelize, DateTypes) => {
  const ComplainType = sequelize.define(
      'ComplainType',
      {
        title: {
          type: DateTypes.STRING,
          allowNull: false,
          validate: {
            isEmpty: false
          }
        }
      },
      { timestamps: false }
  )

  ComplainType.associate = models => {
    ComplainType.hasMany(models.Complain, { onDelete: 'CASCADE', foreignKey: 'typeId' })
  }

  return ComplainType
}