const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`⚠️  Environment file ${envFile} not found!`);
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.SECRET,
    expiresIn: process.env.EXPIRES_IN,
  },
  sql: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DIALECT || 'mysql',
    port: process.env.DATABASE_PORT || 3306,
  },
  nosql: {
    username: process.env.NOSQL_USERNAME,
    password: process.env.NOSQL_PASSWORD,
    database: process.env.NOSQL_DATABASE,
  },
};
