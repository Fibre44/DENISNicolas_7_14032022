module.exports = {
    up: (queryInterface, Sequelize) => {
        // Product belongsToMany Tag
        return queryInterface.createTable(
            'User_Groupe',
            {
                UserId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                },
                GroupeId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: 'Groupes',
                        key: 'id'
                    }
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        // remove table
        return queryInterface.dropTable('User_Groupe');
    },
};