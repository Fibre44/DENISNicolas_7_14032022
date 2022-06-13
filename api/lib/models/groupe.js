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
      Groupe.hasMany(models.Message)
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
    title: {
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
    },
    createBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },

    {
      sequelize,
      tableName: "Groupes",
      modelName: 'Groupe',
    });
  return Groupe;
};