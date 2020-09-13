'use strict';

const db = require('./database');
const User = require('./user');
const Vendor = require('./vendor');
const Product = require('./product');
const Category = require('./category');
const Unit = require('./unit');
const Order = require('./order');
const CartItem = require('./cart-item');

Vendor.belongsTo(User);
User.hasMany(Vendor);

Product.belongsTo(User);
User.hasMany(Product);

Product.belongsTo(Vendor);
Vendor.hasMany(Product);

Category.belongsTo(User);
User.hasMany(Category);

Product.belongsTo(Category);
Category.hasMany(Product);

Unit.belongsTo(User);
User.hasMany(Unit);

Product.belongsTo(Unit);
Unit.hasMany(Product);

User.hasMany(User, {as: 'employees'});

Vendor.hasMany(Order);
Order.belongsTo(Vendor);

Product.belongsToMany(Order, {through: CartItem});
Order.belongsToMany(Product, {through: CartItem});

module.exports = {
  db,
  User,
  Vendor,
  Product,
  Category,
  Unit,
  Order,
  CartItem,
};
