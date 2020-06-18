import React, { useState, useEffect, useRef } from 'react';

import ProductCard from '../ProductCard/ProductCard';
import SearchInput from '../SearchInput/SearchInput';
import './Home.css';

const Home = ({ updateCart, cart }) => {
  const products = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [shopProducts, setShopProducts] = useState([]);
  const [productListType, setProductListType] = useState('popular');

  const addToCart = (product) => {
    const productIsInCart = cart.find((prod) => prod.id === product.id);

    if (!productIsInCart) {
      updateCart([...cart, product]);
    }
  };

  const onListTypeClick = (listType) => () => {
    if (!products || !listType) {
      return null;
    }

    setProductListType(listType);

    if (listType === 'popular') {
      const popularGames = products.current.slice().sort(sortByRating);
      return setShopProducts(popularGames);
    }

    if (listType === 'newest') {
      const recentGames = products.current.slice().sort((a, b) => b.published - a.published);
      return setShopProducts(recentGames);
    }
  };

  const onInputChange = (evt) => {
    setSearchValue(evt.target.value);

    if (evt.target.value === '') {
      return setShopProducts(products.current);
    }

    const updatedProductList = shopProducts.filter(({ name }) =>
      name.toLowerCase().includes(evt.target.value)
    );

    setShopProducts(updatedProductList);
  };

  useEffect(() => {
    const setGames = async () => {
      const games = await fetchGames();
      const popularGames = games.sort(sortByRating);

      products.current = games;

      return setShopProducts(popularGames);
    };

    setGames();
  }, []);

  const activeListTypeStyle = { color: '#086972' };

  return (
    <main className="home">
      <SearchInput value={searchValue} onChange={onInputChange} />
      <div>
        <button
          style={productListType === 'popular' ? activeListTypeStyle : {}}
          className="product-list-selector"
          onClick={onListTypeClick('popular')}
        >
          popular
        </button>
        <button
          style={productListType === 'newest' ? activeListTypeStyle : {}}
          className="product-list-selector"
          onClick={onListTypeClick('newest')}
        >
          newest
        </button>
      </div>
      {shopProducts &&
        shopProducts.map((product) => (
          <ProductCard key={`${product.id}`} product={product} addToCart={addToCart} />
        ))}
    </main>
  );
};

async function fetchGames() {
  const apiResult = await fetch('https://qwbegxw1t8.execute-api.us-east-1.amazonaws.com/dev/games');
  const games = await apiResult.json();
  return games;
}

function sortByRating(a, b) {
  return b.rating - a.rating;
}

export default Home;
