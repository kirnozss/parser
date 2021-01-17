const Sequelize = require('sequelize')
const DB = require('../config/config.json')

const sequelize = new Sequelize(
  DB.production.database,
  DB.production.username,
  DB.production.password, {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize