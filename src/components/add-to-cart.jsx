import React from 'react';

const AddToCart = ({addToCart, disableOrderMode, disabled}) => (
  <div className="action-btn-row">
    <button className="action-btn cancel-btn" onClick={disableOrderMode}>
      Back
    </button>
    <button className="action-btn" onClick={addToCart} disabled={disabled}>
      Add To Cart
    </button>
  </div>
);

export default AddToCart;
