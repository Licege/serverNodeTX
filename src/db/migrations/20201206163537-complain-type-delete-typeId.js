module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ComplainTypes', 'typeId')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ComplainTypes', 'typeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ComplainTypes',
        key: 'id'
      }
    })
  }
};
