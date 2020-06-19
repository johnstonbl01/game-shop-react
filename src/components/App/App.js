import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import CartFlyout from '../CartFlyout/CartFlyout';
import Home from '../Home/Home';
import ProductDetail from '../ProductDetail/ProductDetail';
import Checkout from '../Checkout/Checkout';

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, updateCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiResult = await fetch(
        'https://qwbegxw1t8.execute-api.us-east-1.amazonaws.com/dev/games'
      );

      const games = await apiResult.json();
      setProducts(games);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const productIsInCart = cart.find((prod) => prod.id === product.id);

    if (!productIsInCart) {
      updateCart([...cart, product]);
    }
  };

  return (
    <BrowserRouter>
      <CartFlyout show={showCart} cart={cart} setShowCart={setShowCart} updateCart={updateCart} />
      <ScrollToTop />
      <Header cart={cart} setShowCart={setShowCart} />
      <Switch>
        <Route exact path="/">
          <Home addToCart={addToCart} products={products} />
        </Route>

        <Route path="/product/:id">
          <ProductDetail addToCart={addToCart} products={products} />
        </Route>

        <Route exact path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
