'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Groupe)
      Message.hasMany(models.Comment, { foreignKey: "messageId" }, { onDelete: 'CASCADE' })
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    message: DataTypes.TEXT,
    GroupeId: DataTypes.STRING,
    userId: DataTypes.STRING,
    autor: DataTypes.STRING,
    picture: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: "Messages",
    modelName: 'Message',
  });
  return Message;
};