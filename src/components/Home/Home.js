import React, { useState, useEffect } from 'react';

import ProductCard from '../ProductCard/ProductCard';
import SearchInput from '../SearchInput/SearchInput';
import './Home.css';

const Home = ({ addToCart, products }) => {
  const [searchValue, setSearchValue] = useState('');
  const [shopProducts, setShopProducts] = useState([]);
  const [productListType, setProductListType] = useState('popular');

  const onListTypeClick = (listType) => () => {
    if (!products || !listType) {
      return null;
    }

    setProductListType(listType);

    if (listType === 'popular') {
      const popularGames = products.slice().sort(sortByRating);
      return setShopProducts(popularGames);
    }

    if (listType === 'newest') {
      const recentGames = products.slice().sort((a, b) => b.published - a.published);
      return setShopProducts(recentGames);
    }
  };

  const onInputChange = (evt) => {
    setSearchValue(evt.target.value);

    if (evt.target.value === '') {
      return setShopProducts(products);
    }

    const updatedProductList = products
      .slice()
      .filter(({ name }) => name.toLowerCase().includes(evt.target.value));

    setShopProducts(updatedProductList);
  };

  useEffect(() => {
    if (products) {
      const popularGames = products.sort(sortByRating);
      setShopProducts(popularGames);
    }
  }, [products]);

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

function sortByRating(a, b) {
  return b.rating - a.rating;
}

export default Home;
