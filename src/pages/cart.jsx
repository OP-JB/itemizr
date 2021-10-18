import React, {useState, useEffect, useCallback} from 'react';
import {useOverflowState} from '../utility/hooks';
import history from '../history';
import axios from 'axios';
import Header from '../components/header';
import AddToCart from '../components/add-to-cart';

const Cart = (props) => {
  const [products, setProducts] = useState([]);

  // const getProducts = useCallback(async () => {
  //   const {pathname} = history.location;
  //   const {vendorId} = props.match.params;
  //   const vendorPath = !vendorId ? '/products' : `/products/${vendorId}`;
  //   const path = pathname === vendorPath ? vendorPath : pathname;
  //   try {
  //     const {data} = await axios.get(`/api${path}`);
  //     setProducts(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [setProducts]);

  // useEffect(() => {
  //   let subscribed = true;
  //   if (subscribed) {
  //     getProducts();
  //   }
  //   return () => (subscribed = false);
  // }, [props.match.params]);

  return (
    <div className="page-pdg">
      <Header title="Cart" action={<AddToCart />} />
    </div>
  );
};

export default Cart;
