module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Reviews',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'userId')
  }
};
