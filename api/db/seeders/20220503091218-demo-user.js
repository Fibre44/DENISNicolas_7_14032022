'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      id: 'root',
      email: 'admin@goupomania.fr',
      password: '$2b$10$Y2G4kNKzLrTYYDk46kQcI.vJn4MLU/RUlSpVAEv9ZbC9vnPnQYvGK',
      firstname: 'root',
      lastname: 'root',
      role: 'Administrator',
      picture: null,
      pictureUrl: null,
      createdAt: new Date(),
      updatedAt: new Date()

    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
