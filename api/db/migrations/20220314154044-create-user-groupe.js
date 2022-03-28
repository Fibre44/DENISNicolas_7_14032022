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
                    type: Sequelize.UUID,
                    primaryKey: true,
                    references: {
                        model: 'User',
                        key: 'id'
                    }
                },
                GroupeId: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    references: {
                        model: 'Groupe',
                        key: 'id'
                    }
                },
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        // remove table
        return queryInterface.dropTable('User_Groupe');
    },
};