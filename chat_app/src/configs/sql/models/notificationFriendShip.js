'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationFriendShip extends Model {
    static associate(models) {
      NotificationFriendShip.belongsTo(models.FriendShip, {
        foreignKey: 'friendShipId',
        as: 'friendShip',
        onDelete: 'CASCADE',
      });
    }
  }
  NotificationFriendShip.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      friendShipId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'FriendShips',
          key: 'id',
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'NotificationFriendShip',
      tableName: 'notificationFriendShips',
    }
  );
  return NotificationFriendShip;
};
