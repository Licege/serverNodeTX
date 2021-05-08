module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'User',
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: 8,
              msg: 'Слишком короткий пароль'
            }
          }
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        forename: {
          type: DataTypes.STRING,
          allowNull: false
        },
        patronymic: DataTypes.STRING,
        avatar: DataTypes.STRING,
        phone: DataTypes.STRING,
        birthday: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        blocked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        addressId: DataTypes.INTEGER
      }
  )

  User.associate = models => {
    User.hasOne(models.Address, { foreignKey: 'addressId'})
    User.hasOne(models.Review, { onDelete: 'CASCADE', foreignKey: 'userId' })
    User.hasMany(models.Orders, { foreignKey: 'userId' })
    User.hasMany(models.Token, { onDelete: 'CASCADE', foreignKey: 'userId' })
    User.hasMany(models.Orders, { onDelete: 'CASCADE', foreignKey: 'userId' })
    User.hasMany(models.Delivery, { onDelete: 'CASCADE', foreignKey: 'userId' })
    User.hasMany(models.Complain, { foreignKey: 'userId' })
  }

  return User
}