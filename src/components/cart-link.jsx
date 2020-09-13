import React from 'react';
import {Link} from 'react-router-dom';

const CartLink = ({quantity}) => (
  <Link className={`${!quantity && 'empty'} action-btn cart-link`} to="/cart">
    <p>Cart:</p>
    <p>{quantity + (quantity && ' items')}</p>
  </Link>
);

export default CartLink;
