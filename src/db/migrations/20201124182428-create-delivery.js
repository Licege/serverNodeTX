'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      paymentType: {
        type: Sequelize.STRING
      },
      deliveryType: {
        type: Sequelize.STRING
      },
      timeDelivery: {
        type: Sequelize.DATE
      },
      countPerson: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
      paymentStatus: {
        type: Sequelize.INTEGER
      },
      list: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      deliveryCost: {
        type: Sequelize.INTEGER
      },
      sale: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      oddMoney: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      address: {
        type: Sequelize.JSONB,
        defaultValue: {
          city: '',
          street: '',
          house: '',
          flat: '',
          floor: '',
          intercom: ''
        }
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Deliveries');
  }
};