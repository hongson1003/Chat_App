import configEnv from '@config';
import { Sequelize } from 'sequelize';
import config from './configMysql';

const connectMySql = async () => {
  const sequelize = new Sequelize(config[configEnv.nodeEnv]);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.bgCyan);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connectMySql;
