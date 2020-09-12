const Sequelize = require('sequelize');
const db = require('./database');

const CartItem = db.define('cart-item', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;
