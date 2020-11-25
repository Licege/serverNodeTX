module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Dishes', 'isShow', {
      type: Sequelize.bool,
      allowNull: false,
      defaultValue: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Dishes', 'isShow')
  }
};
