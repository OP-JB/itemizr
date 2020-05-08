import React, {Fragment, useState} from 'react';
import axios from 'axios';
import '../css/product-form.css';

const ProductForm = ({
  product,
  handleChange,
  handleSubmit,
  closeForm,
  userMsg,
  formButtons,
}) => (
  <div className="product-form-wrapper">
    <form className="product-form row vt-pdg-20" onSubmit={handleSubmit}>
      <input
        key="name"
        placeholder={product.name || 'Name'}
        name="name"
        value={product.name}
        onChange={handleChange}
      />
      <input
        id="product-number"
        key="productNumber"
        placeholder={product.productNumber || 'No.'}
        title="Product number is read only" // TODO: show on click
        disabled
      />
      <input
        placeholder={product.category || 'Category'}
        name="category"
        value={product.category}
        onChange={handleChange}
      />
      <input
        placeholder={product.vendor || 'Vendor'}
        name="vendor"
        value={product.vendor}
        onChange={handleChange}
      />
      <div className="price-container">
        <input
          placeholder={product.price}
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          placeholder={product.quantity}
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <select name="unit" onChange={handleChange} defaultValue="Unit">
          <option value="Unit">Unit</option>
          <option value="Case">Case</option>
          <option value="Tray">Tray</option>
          <option value="Bag">Bag</option>
        </select>
      </div>
      <input
        placeholder={product.par}
        name="par"
        value={product.par}
        onChange={handleChange}
      />
      <input
        placeholder={product.onHand}
        name="onHand"
        value={product.onHand}
        onChange={handleChange}
      />
    </form>
    <div className="user-msg">{userMsg}</div>
    <div>{formButtons}</div>
  </div>
);

export default ProductForm;
