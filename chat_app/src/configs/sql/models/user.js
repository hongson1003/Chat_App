'use strict';
import { userHandler } from '@/utils';
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
      fullName: DataTypes.STRING,
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
      tableName: 'users',
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            user.password = userHandler.hashPassword(user.password);
          }
          user.username = user.phoneNumber;
          user.lastedOnline = new Date();
        },
      },
    }
  );
  return User;
};
