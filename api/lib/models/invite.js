'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invite.init({
    UserId: DataTypes.UUID,
    GroupId: DataTypes.UUID,
    groupName: DataTypes.STRING,
    inviteBy: DataTypes.STRING
  }, {
    sequelize,
    tableName: "Invites",

    modelName: 'Invite',
  });
  return Invite;
};