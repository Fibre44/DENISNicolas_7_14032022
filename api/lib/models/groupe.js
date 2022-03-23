'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groupe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Groupe.belongsToMany(models.User, { through: 'User_Groupe' })

    }
  }
  Groupe.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }


  },

    {
      sequelize,
      modelName: 'Groupe',
    });
  return Groupe;
};