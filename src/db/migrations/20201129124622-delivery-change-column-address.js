'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Deliveries', 'addressId')
    await queryInterface.addColumn('Deliveries', 'address', {
      type: Sequelize.JSONB,
      defaultValue: {
        city: '',
        street: '',
        house: '',
        flat: '',
        floor: '',
        intercom: ''
      }
    })

    return queryInterface
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Deliveries', 'address')
    await queryInterface.addColumn('Deliveries', 'addressId', { type: Sequelize.INTEGER })

    return queryInterface
  }
};
