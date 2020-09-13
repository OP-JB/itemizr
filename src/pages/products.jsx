import React, {useState, useEffect, useCallback} from 'react';
import {useOverflowState} from '../utility/hooks';
import history from '../history';
import axios from 'axios';
import Header from '../components/header';
import TableHeader from '../components/table-header';
import Product from '../components/product';
import EditProduct from '../components/edit-product';
import AddProduct from '../components/add-product';
import AddItemButton from '../components/add-item-button';
import CreateOrderButton from '../components/create-order-button';
import CartLink from '../components/cart-link';
import AddToCart from '../components/add-to-cart';
import {formatNumToThreeDigitStr, formatPrice} from '../utility/helpers';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [addFormState, setAddFormState] = useState(false);
  const [editFormState, setEditFormState] = useState({id: null, isOpen: false});
  const [orderModeState, setOrderModeState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const {overflowState, closeOverflow, toggleOverflow} = useOverflowState();

  const insertProduct = (newProduct) => setProducts([...products, newProduct]);

  const updateProducts = (productData) => {
    const updatedProducts = products.map((product) => {
      const updated = product.id === productData.id ? productData : product;
      updated.price =
        updated.price.length < 4 ? formatPrice(updated.price) : updated.price;
      return updated;
    });
    setProducts(updatedProducts);
  };

  const toggleCheckedProduct = (checked, productId) => {
    const updated = products.map((product) => {
      if (product.id === productId) {
        product.checked = checked;
      }
      return product;
    });
    setProducts(updated);
  };

  const getProducts = useCallback(async () => {
    const {pathname} = history.location;
    const {vendorId} = props.match.params;
    const vendorPath = !vendorId ? '/products' : `/products/${vendorId}`;
    const path = pathname === vendorPath ? vendorPath : pathname;
    try {
      const {data} = await axios.get(`/api${path}`);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }, [setProducts]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  const openAddForm = () => setAddFormState(true);
  const closeAddForm = () => {
    setAddFormState(false);
    closeOverflow();
  };

  const openEditForm = (id) => setEditFormState({id, isOpen: true});
  const closeEditForm = (id) => setEditFormState({id: null, isOpen: false});

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      getProducts();
    }
    return () => (subscribed = false);
  }, [props.match.params]);

  const tableHeaders = [
    'Item',
    'No.',
    'Category',
    'Vendor',
    'Unit',
    'Par',
    'On-hand',
  ];

  const formatProduct = ({
    id,
    name,
    category,
    vendor,
    price,
    packageQty,
    unit,
    par,
    onHand,
    checked = false,
  }) => {
    const productNumber = formatNumToThreeDigitStr(id);
    const priceStr = formatPrice(price);
    const categoryName = category ? category.name : '';
    const unitName = unit ? unit.name : '';
    const productData = {
      name,
      productNumber,
      category: categoryName,
      vendor: vendor.name,
      price: priceStr,
      packageQty,
      unit: unitName,
      par,
      onHand,
      checked,
    };
    return productData;
  };

  const getEditState = (productId) => {
    const {id, isOpen} = editFormState;
    const editState = isOpen && id === productId;
    return editState;
  };

  const getOverflowMenuState = (productId) => {
    const {id, isOpen} = overflowState;
    const overflowMenuState = isOpen && productId === id && !addFormState;
    return overflowMenuState;
  };

  const enableOrderMode = () => setOrderModeState(true);
  const disableOrderMode = () => setOrderModeState(false);

  const updateCartQty = (quantity) => setCartQty(quantity);

  const addToCart = async () => {
    const products = getCheckedProducts();
    try {
      const {data} = await axios.post('/api/orders/cart', products);
      updateCartQty(data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const getCheckedProducts = () => products.filter(({checked}) => checked);

  const renderProducts = () =>
    products.map((product) => {
      const {id} = product;
      const productData = formatProduct(product);
      const toggleOverflowMenu = () => toggleOverflow(id);
      const overflowMenuState = getOverflowMenuState(id);
      const editProduct = () => openEditForm(id);
      const editState = getEditState(id);
      return editState ? (
        <EditProduct
          key={id + Math.random()}
          id={id}
          currentState={productData}
          updateProducts={updateProducts}
          closeOverflow={closeOverflow}
          closeForm={closeEditForm}
        />
      ) : (
        <Product
          key={id + Math.random()}
          id={id}
          productData={productData}
          editProduct={editProduct}
          updateProducts={updateProducts}
          deleteProduct={deleteProduct}
          orderMode={orderModeState}
          toggleCheckedProduct={toggleCheckedProduct}
          overflowMenuState={overflowMenuState}
          toggleOverflow={toggleOverflowMenu}
        />
      );
    });

  const renderAddProduct = () =>
    addFormState ? (
      <AddProduct insertProduct={insertProduct} closeForm={closeAddForm} />
    ) : (
      <AddItemButton text="Add a product" handleClick={openAddForm} />
    );

  const renderAddToCart = () => (
    <AddToCart
      addToCart={addToCart}
      disableOrderMode={disableOrderMode}
      disabled={!getCheckedProducts().length}
    />
  );

  return (
    <div className="page-pdg">
      <Header
        title="Products"
        action={
          orderModeState ? (
            <CartLink quantity={cartQty} />
          ) : (
            <CreateOrderButton handleClick={enableOrderMode} disabled={true} />
          )
        }
      />
      <table>
        <TableHeader headers={tableHeaders} />
        <tbody className="table-body">{products && renderProducts()}</tbody>
      </table>
      {orderModeState
        ? renderAddToCart()
        : !editFormState.isOpen && renderAddProduct()}
    </div>
  );
};

export default Products;
