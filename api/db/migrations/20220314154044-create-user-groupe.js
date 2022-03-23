module.exports = {
    up: (queryInterface, Sequelize) => {
        // Product belongsToMany Tag
        return queryInterface.createTable(
            'User_Groupe',
            {
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                UserId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                GroupeId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        // remove table
        return queryInterface.dropTable('User_Groupe');
    },
};