const Sequelize = require('sequelize');
const db = require('./database');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(20, 2),
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
