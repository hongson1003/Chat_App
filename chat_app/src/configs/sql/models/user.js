'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.ProfileContact, {
        as: 'userInfo',
        foreignKey: 'userId',
      });

      User.belongsToMany(models.User, {
        as: 'friends',
        through: 'FriendShip',
        foreignKey: 'requesterId',
        otherKey: 'receiverId',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: DataTypes.BLOB('long'),
      lastedOnline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      refresh_token: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
