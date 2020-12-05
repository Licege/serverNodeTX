'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('GlobalSettings', 'createdAt')
    await queryInterface.removeColumn('GlobalSettings', 'updatedAt')

    return queryInterface
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'GlobalSettings',
        'createdAt',
        {
          type: Sequelize.DATE,
          defaultValue: new Date()
        })
    await queryInterface.addColumn(
        'GlobalSettings',
        'updatedAt',
        {
          type: Sequelize.DATE,
          defaultValue: new Date()
        })

    return queryInterface
  }
};
