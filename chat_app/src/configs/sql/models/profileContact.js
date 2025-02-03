'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileContact extends Model {
    static associate(models) {
      ProfileContact.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  ProfileContact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      birthDate: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      soundTrack: DataTypes.STRING,
      coverImage: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'ProfileContact',
      tableName: 'profileContacts',
    }
  );
  return ProfileContact;
};
