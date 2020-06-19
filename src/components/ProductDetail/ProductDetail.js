import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import clockIcon from './clock.svg';
import playersIcon from './users.svg';
import starIcon from './star.svg';
import './ProductDetail.css';

const ProductDetail = ({ addToCart, products }) => {
  const { id } = useParams();

  const product = products.find((prod) => prod.id === id);

  if (!product) {
    return <Redirect to="/" />;
  }

  return (
    <main className="product-detail">
      <img className="product-image" src={product.url} alt={`Box for ${product.name}`} />
      <div className="product-header">
        <h2>{product.name}</h2>
        <h4 className="product-price">${product.price}</h4>
      </div>

      <p>{product.desc}</p>

      <div className="product-footer-layout">
        <div>
          <div className="product-info-layout">
            <img className="icon" src={playersIcon} alt="number of players icon" />
            <span>{product.players} players</span>
          </div>
          <div className="product-info-layout">
            <img className="icon" src={clockIcon} alt="number of players icon" />
            <span>
              {product.gameTimeHours} {product.gameTimeHours === '1' ? 'hour' : 'hours'}
            </span>
          </div>
          <div className="product-info-layout">
            <img className="icon" src={starIcon} alt="number of players icon" />
            <span>{product.rating}</span>
          </div>
        </div>
        <button className="product-add-to-bag-btn" onClick={() => addToCart(product)}>
          add to bag
        </button>
      </div>
    </main>
  );
};

export default ProductDetail;
