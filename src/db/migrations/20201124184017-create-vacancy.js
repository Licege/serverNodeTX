'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vacancies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      requirements: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      salaryFrom: {
        type: Sequelize.INTEGER
      },
      salaryTo: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Vacancies');
  }
};