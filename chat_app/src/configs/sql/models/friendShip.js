'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendShip extends Model {
    static associate(models) {
      FriendShip.belongsTo(models.User, {
        foreignKey: 'requesterId',
        as: 'requester',
      });

      FriendShip.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'receiver',
      });
    }
  }
  FriendShip.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'FriendShip',
    }
  );
  return FriendShip;
};
