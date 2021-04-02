module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ComplainTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ComplainTypes',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmpty: false
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ComplainTypes');
  }
};