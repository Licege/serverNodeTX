module.exports = {
  up: async (queryInterface, Sequelize) => {
   queryInterface.addColumn(
       'Dishes',
       'categoryId',
       {
         type: Sequelize.INTEGER,
         references: {
           model: 'Categories',
           key: 'id'
         }
       }
   )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Dishes', 'categoryId')
  }
};
