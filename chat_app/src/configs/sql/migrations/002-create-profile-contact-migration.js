module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProfileContacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      soundTrack: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProfileContacts');
  },
};
