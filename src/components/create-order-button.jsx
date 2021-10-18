import React from 'react';

const CreateOrderButton = ({handleClick, disabled}) => (
  <button className="action-btn" onClick={handleClick} disabled={false}>
    Create Order
  </button>
);

export default CreateOrderButton;
