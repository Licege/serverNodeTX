'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
        'Tokens',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Tokens', 'userId')
  }
};
