module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sid: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      userId: Sequelize.INTEGER,
      data: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expires: Sequelize.DATE
    }),

  down: async queryInterface => queryInterface.dropTable('Sessions')
};
