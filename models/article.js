const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const article = sequelize.define('Articles', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imgs: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  },
  // migrationTest: {
  //   type: Sequelize.TEXT,
  //   allowNull: true
  // },

})

module.exports = article
