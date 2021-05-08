module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CommonSettings', [{
      city: 'Калининград',
      priceForDelivery: 250,
      freeDelivery: 1000,
      isDelivery: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CommonSettings', { city: 'Калининград' }, {})
  }
};
