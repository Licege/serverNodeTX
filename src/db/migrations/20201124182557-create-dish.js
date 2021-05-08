'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      weight: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isDelivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isShow: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      imageSrc: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Dishes');
  }
};