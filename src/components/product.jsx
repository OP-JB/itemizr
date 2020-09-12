import React, {Fragment, useState} from 'react';
import DataCells from './data-cells';
import OverflowIcon from './overflow-icon';
import OverflowMenu from './overflow-menu';
import EditButton from './edit-button';
import '../css/table-row.css';

const Product = ({
  id,
  productData,
  editProduct,
  deleteProduct,
  orderMode,
  toggleCheckedProduct,
  overflowMenuState,
  toggleOverflow,
}) => {
  const [checkedState, setCheckedState] = useState(productData.checked);

  const toggleCheck = () => {
    setCheckedState(!checkedState);
    toggleCheckedProduct(!checkedState, id);
  };

  const renderPrice = (key) => {
    return key === 'price' ? (
      <div className="price-column">
        <p>{`$ ${productData.price}`}</p>
        <span className="unit-container">
          <p>{productData.quantity}</p>
          <p>/</p>
          <p>{productData.unit}</p>
        </span>
      </div>
    ) : null;
  };

  const priceKeys = ['price', 'quantity', 'unit'];
  const productKeys = Object.keys(productData);
  const formattedProductData = productKeys.map((key) =>
    priceKeys.includes(key) ? renderPrice(key) : productData[key]
  );
  const productValues = formattedProductData.filter((value) => value !== null);

  return (
    <Fragment>
      <tr className="light-font">
        {orderMode && (
          <td>
            <button
              className={`custom-radio-btn ${checkedState ? 'checked' : ''}`}
              onClick={toggleCheck}
            ></button>
          </td>
        )}
        <DataCells data={productValues} />
        <OverflowIcon toggleMenu={toggleOverflow} />
        {overflowMenuState && (
          <OverflowMenu
            editButton={<EditButton handleClick={editProduct} />}
            deleteRow={() => deleteProduct(id)}
          />
        )}
      </tr>
    </Fragment>
  );
};

export default Product;
