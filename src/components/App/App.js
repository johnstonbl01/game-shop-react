import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home';
import ProductDetail from '../ProductDetail/ProductDetail';

const App = () => {
  const [cart, updateCart] = useState([]);

  return (
    <BrowserRouter>
      <Header cart={cart} />
      <Switch>
        <Route exact path="/">
          <Home updateCart={updateCart} cart={cart} />
        </Route>

        <Route path="/product/:id">
          <ProductDetail updateCart={updateCart} cart={cart} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
