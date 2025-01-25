const configEnv = require('../../../config')

const config = {
  development: {
    username: configEnv.sql.username,
    password: configEnv.sql.password,
    database: configEnv.sql.database,
    host: configEnv.sql.host,
    dialect: configEnv.sql.dialect,
    port: configEnv.sql.port,
    query: {
      raw: true,
    },
    logging: false,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    timezone: '+07:00',
  },
  production: {
    username: configEnv.sql.username,
    password: configEnv.sql.password,
    database: configEnv.sql.database,
    host: configEnv.sql.host,
    dialect: configEnv.sql.dialect,
    port: configEnv.sql.port,
    query: {
      raw: true,
    },
    logging: false,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    timezone: '+07:00',
  },
}

module.exports = config
