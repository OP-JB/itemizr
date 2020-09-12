import React from 'react';

const AddToCartButton = ({handleClick, disabled}) => (
  <button
    className="action-btn add-to-cart"
    onClick={handleClick}
    disabled={false}
  >
    Cart
  </button>
);

export default AddToCartButton;
