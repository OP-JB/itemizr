import React, {useState, useEffect} from 'react';
import '../css/product-form.css';
import Options from './options';
import Select from './select';

const ProductForm = ({
  product,
  handleChange,
  handleSubmit,
  userMsg,
  formButtons,
}) => {
  const [optionsState, setOptionsState] = useState({type: '', open: false});

  const toggleOptions = (type) => {
    if (!type) {
      setOptionsState({type: '', open: false});
    } else if (type !== optionsState.type) {
      setOptionsState({type: '', open: false});
      setOptionsState({type, open: true});
    } else {
      setOptionsState({type, open: !optionsState.open});
    }
  };

  const toggleVendorOptions = () => {
    toggleOptions('vendor');
  };
  const toggleCategoryOptions = () => {
    toggleOptions('category');
  };
  const toggleUnitOptions = () => {
    toggleOptions('unit');
  };
  const closeAllOptions = () => {
    toggleOptions('');
  };

  const {
    name,
    productNumber,
    category,
    vendor,
    price,
    packageQty,
    unit,
    par,
    onHand,
  } = product;

  const vendorName = typeof vendor !== 'string' ? vendor.name : vendor;

  return (
    <div className="product-form-wrapper">
      <div className="product-form">
        <form className="product-form-inputs row" onSubmit={handleSubmit}>
          <label className="hidden-label" htmlFor="name">
            Name
          </label>
          <input
            placeholder={name || 'Name'}
            name="name"
            value={name}
            onChange={handleChange}
            onClick={closeAllOptions}
          />
          <label className="hidden-label" htmlFor="productNumber">
            Product No.
          </label>
          <input
            id="product-number"
            placeholder={productNumber || 'No.'}
            title="Product number is read only" // TODO: show on click
            disabled
          />
          <label className="hidden-label" htmlFor="category">
            Category
          </label>
          <Select
            currentSelection={category}
            defaultSelection="Category"
            toggleOptions={toggleCategoryOptions}
          />
          <label className="hidden-label" htmlFor="vendor">
            Vendor
          </label>
          <Select
            currentSelection={vendorName}
            defaultSelection="Vendor"
            toggleOptions={toggleVendorOptions}
          />
          <div className="price-input">
            <label className="hidden-label" htmlFor="price">
              Price
            </label>
            <input
              placeholder={price}
              name="price"
              value={price}
              onChange={handleChange}
            />
            <div className="unit-input">
              <div className="flex-item">
                <label className="hidden-label" htmlFor="packageQty"></label>
                <input
                  placeholder={packageQty}
                  name="packageQty"
                  value={packageQty}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-item">
                <label className="hidden-label" htmlFor="unit">
                  Unit
                </label>
                <Select
                  currentSelection={unit}
                  defaultSelection="Unit"
                  toggleOptions={toggleUnitOptions}
                />
              </div>
            </div>
          </div>
          <label className="hidden-label" htmlFor="par">
            Par
          </label>
          <input
            placeholder={par}
            name="par"
            value={par}
            onChange={handleChange}
            onClick={closeAllOptions}
          />
          <label className="hidden-label" htmlFor="onHand">
            On-hand
          </label>
          <input
            placeholder={onHand}
            name="onHand"
            value={onHand}
            onChange={handleChange}
            onClick={closeAllOptions}
          />
        </form>
        <div className="row options-row">
          <div className="hidden-cell"></div>
          <div className="hidden-cell"></div>
          <div className="hidden-cell category-options-wrapper">
            {optionsState.type === 'category' && optionsState.open && (
              <Options
                type="category"
                endpoint="categories"
                currentSelection={category}
                handleChange={handleChange}
                overflowState={toggleCategoryOptions}
              />
            )}
          </div>
          <div className="hidden-cell vendor-options-wrapper">
            {optionsState.type === 'vendor' && optionsState.open && (
              <Options
                type="vendor"
                endpoint="vendors"
                currentSelection={vendorName}
                handleChange={handleChange}
                overflowState={toggleVendorOptions}
              />
            )}
          </div>
          <div className="hidden-cell unit-options-wrapper">
            {optionsState.type === 'unit' && optionsState.open && (
              <Options
                type="unit"
                endpoint="units"
                currentSelection={unit}
                handleChange={handleChange}
                overflowState={toggleUnitOptions}
              />
            )}
          </div>
          <div className="hidden-cell"></div>
          <div className="hidden-cell"></div>
        </div>
        <div className="user-msg">{userMsg}</div>
        <div className="form-button-wrapper">{formButtons}</div>
      </div>
    </div>
  );
};

export default ProductForm;
