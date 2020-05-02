const Sequelize = require('sequelize')
const db = require('./database')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  unit: {
    type: Sequelize.STRING,
  },
  onHand:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  par:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  orderQty:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product
