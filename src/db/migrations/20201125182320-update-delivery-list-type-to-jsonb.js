'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Deliveries', 'list', {
      type: Sequelize.JSONB,
      defaultValue: []
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Deliveries', 'list', {
      type: Sequelize.JSON,
      defaultValue: []
    })
  }
};
