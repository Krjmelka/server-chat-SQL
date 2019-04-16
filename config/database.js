const Sequelize = require('sequelize');

module.exports =  new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb'
});