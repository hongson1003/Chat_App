require('@babel/register')({
  presets: ['@babel/preset-env'],
  extensions: ['.js'],
});

require('module-alias/register');
require('sequelize-cli/lib/sequelize');
