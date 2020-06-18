import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import shoppingBag from './shopping-bag.svg';

const Header = ({ cart = [] }) => {
  return (
    <header>
      <Link to="/">
        <h1>
          games<span>.</span>
        </h1>
      </Link>
      <div style={{ position: 'relative' }}>
        {cart.length > 0 && <span className="items-in-cart">{cart.length}</span>}
        <img src={shoppingBag} alt="shopping bag"></img>
      </div>
    </header>
  );
};

export default Header;
