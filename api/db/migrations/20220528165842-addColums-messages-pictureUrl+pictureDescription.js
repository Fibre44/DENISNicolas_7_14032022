'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Messages', 'imageUrl', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('Messages', 'imageDescription', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t })
      ]);
    });

  },


  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
