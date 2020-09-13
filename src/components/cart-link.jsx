import React from 'react';
import {Link} from 'react-router-dom';

const CartLink = ({disabled}) => (
  <Link className="action-btn cart-link" to="/cart" disabled={false}>
    Cart
  </Link>
);

export default CartLink;
