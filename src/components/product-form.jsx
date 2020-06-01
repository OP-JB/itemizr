import React, {useState} from 'react';
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
  const [categoryOptionsState, setCategoryOptionsState] = useState(false);
  const [vendorOptionsState, setVendorOptionsState] = useState(false);
  const [unitOptionsState, setUnitOptionsState] = useState(false);

  // can this be dried up inside the select or options component?
  const toggleVendorOptions = () => {
    categoryOptionsState && setCategoryOptionsState(false);
    unitOptionsState && setUnitOptionsState(false);
    setVendorOptionsState(!vendorOptionsState);
  };
  const toggleCategoryOptions = () => {
    vendorOptionsState && setVendorOptionsState(false);
    unitOptionsState && setUnitOptionsState(false);
    setCategoryOptionsState(!categoryOptionsState);
  };
  const toggleUnitOptions = () => {
    vendorOptionsState && setVendorOptionsState(false);
    categoryOptionsState && setCategoryOptionsState(false);
    setUnitOptionsState(!unitOptionsState);
  };

  const {
    name,
    productNumber,
    category,
    vendor,
    price,
    quantity,
    unit,
    par,
    onHand,
  } = product;

  const vendorName = typeof vendor !== 'string' ? vendor.name : vendor;

  return (
    <div className="product-form-wrapper">
      <div className="product-form">
        <form className="product-form-inputs row" onSubmit={handleSubmit}>
          <input
            placeholder={name || 'Name'}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            id="product-number"
            placeholder={productNumber || 'No.'}
            title="Product number is read only" // TODO: show on click
            disabled
          />
          <Select
            currentSelection={category}
            defaultSelection="Category"
            toggleOptions={toggleCategoryOptions}
          />
          <Select
            currentSelection={vendorName}
            defaultSelection="Vendor"
            toggleOptions={toggleVendorOptions}
          />
          <div className="price-input">
            <input
              placeholder={price}
              name="price"
              value={price}
              onChange={handleChange}
            />
            <div className="qty-wrapper">
              <input
                placeholder={quantity}
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
              <Select
                currentSelection={unit}
                defaultSelection="Unit"
                toggleOptions={toggleUnitOptions}
              />
            </div>
          </div>
          <input
            placeholder={par}
            name="par"
            value={par}
            onChange={handleChange}
          />
          <input
            placeholder={onHand}
            name="onHand"
            value={onHand}
            onChange={handleChange}
          />
        </form>
        <div className="row options-row">
          <div className="hidden-cell"></div>
          <div className="hidden-cell"></div>
          <div className="hidden-cell category-options-wrapper">
            {categoryOptionsState && (
              <Options
                type="category"
                endpoint="categories"
                currentSelection={category}
                handleChange={handleChange}
                toggleState={toggleCategoryOptions}
              />
            )}
          </div>
          <div className="hidden-cell vendor-options-wrapper">
            {vendorOptionsState && (
              <Options
                type="vendor"
                endpoint="vendors"
                currentSelection={vendorName}
                handleChange={handleChange}
                toggleState={toggleVendorOptions}
              />
            )}
          </div>
          <div className="hidden-cell unit-options-wrapper">
            {unitOptionsState && (
              <Options
                type="unit"
                endpoint="units"
                currentSelection={unit}
                handleChange={handleChange}
                toggleState={toggleUnitOptions}
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
