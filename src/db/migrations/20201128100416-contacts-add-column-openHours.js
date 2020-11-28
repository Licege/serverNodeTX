'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
        'Contacts',
        'openHours',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Contacts', 'openHours')
  }
};
