module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Deliveries', 'oddMoney')
    await queryInterface.addColumn(
        'Deliveries',
        'oddMoney',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0
        })

    return queryInterface
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Deliveries', 'oddMoney')
    await queryInterface.addColumn(
        'Deliveries',
        'oddMoney',
        {
          type: Sequelize.STRING
        })

    return queryInterface
  }
};
