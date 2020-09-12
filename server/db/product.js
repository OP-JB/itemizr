const Sequelize = require('sequelize');
const db = require('./database');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(20, 2),
    // defaultValue: 0.0,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  onHand: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  par: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Product;
