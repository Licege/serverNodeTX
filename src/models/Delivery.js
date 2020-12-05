module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define(
      'Delivery',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true
          }
        },
        paymentType: {
          type: DataTypes.STRING,
          allowNull: false
        },
        deliveryType: {
          type: DataTypes.STRING,
          allowNull: false
        },
        oddMoney: DataTypes.STRING,
        timeDelivery: DataTypes.DATE,
        countPerson: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        comment: DataTypes.TEXT,
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        paymentStatus: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        list: {
          type: DataTypes.JSONB,
          defaultValue: []
        },
        deliveryCost: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        sale: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        price: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        address: {
            type: DataTypes.JSONB,
            defaultValue: {
                city: '',
                street: '',
                house: '',
                flat: '',
                floor: '',
                intercom: ''
            }
        }
      }
  )

  Delivery.associate = models => {
    Delivery.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' })
  }

  return Delivery
}