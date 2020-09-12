const Sequelize = require('sequelize');
const db = require('./database');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(20, 2),
  },
});

module.exports = Order;
