import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Cart from './pages/cart';
import Products from './pages/products';
import Vendors from './pages/vendors';
import Signup from './pages/signup';
import Login from './pages/login';
import NotFound from './pages/not-found';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/:vendorId" component={Products} />
      <Route exact path="/vendors" component={Vendors} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Routes;
