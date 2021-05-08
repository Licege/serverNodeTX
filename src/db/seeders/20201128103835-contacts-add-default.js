'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contacts', [{
      vk: 'https://vk.com/trixolma',
      fb: '',
      tg: '',
      inst: 'https://www.instagram.com/tri_xolma/',
      google: '',
      tw: '',
      phone: '+7 911 454-16-76',
      address: 'Мамоновское ш., 13 км, Калининград, 236028',
      createdAt: new Date(),
      updatedAt: new Date(),
      openHours: ['Пн-Вc: 12:00 - 01:00']
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contacts', null, {})
  }
};
