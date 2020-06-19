import React from 'react';
import { useHistory } from 'react-router-dom';

import closeIcon from './x.svg';
import './CartFlyout.css';

const CartFlyout = ({ show, cart = [], setShowCart, updateCart }) => {
  const history = useHistory();
  const flyoutClass = show ? 'show' : 'hide';

  const onCheckoutClick = () => {
    setShowCart(false);
    history.push('/checkout');
    updateCart([]);
  };

  return (
    <div className={`flyout ${flyoutClass}`}>
      <header>
        <h1>cart</h1>
        <div onClick={() => setShowCart(false)}>
          <img src={closeIcon} alt="close cart"></img>
        </div>
      </header>
      <div className="product-container">
        {cart.length > 0 && cart.map((product) => <CartProduct product={product} />)}
      </div>
      <div className="total-layout">
        <h2>Total</h2>
        <h2>${calculateTotal(cart)}</h2>
      </div>
      <div className="checkout-layout">
        <button onClick={onCheckoutClick}>checkout</button>
      </div>
    </div>
  );
};

const CartProduct = ({ product }) => {
  return (
    <article className="cart-product">
      <div className="product-layout">
        <div className="box-img-layout">
          <img src={product.url} alt={`Box for ${product.name}`} />
        </div>
        <p className="cart-product-name">{product.name}</p>
      </div>

      <span>${product.price}</span>
    </article>
  );
};

function calculateTotal(cart) {
  return cart.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2);
}

export default CartFlyout;
