module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Благодарность' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Качество и вкус блюд' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Неверный или неполный заказ' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Обслуживание' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Долгое ожидание' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Вопрос по акции' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Вопрос по доставке' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Предложения' }])
    await queryInterface.bulkInsert('ComplainTypes', [{ title: 'Другое' }])

    return queryInterface
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ComplainTypes', null, {})
  }
};
