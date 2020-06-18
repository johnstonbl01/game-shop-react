import React from 'react';
import { useHistory } from 'react-router-dom';

import plusCircle from './plus-circle.svg';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const routeHistory = useHistory();

  const routeToProductPage = () => routeHistory.push(`/product/${product.id}`, { product });

  return (
    <article>
      <div className="card-content" onClick={routeToProductPage}>
        <div className="box-img-layout">
          <img src={product.url} alt={`Box for ${product.name}`} />
        </div>
        <div className="product-details">
          <p className="product-name">{product.name}</p>
          <div className="product-extra-info-layout">
            <span className="product-published">{product.published}</span>
            <span>${product.price}</span>
          </div>
        </div>
      </div>
      <div className="add-to-bag-btn" onClick={() => addToCart(product)}>
        <img src={plusCircle} alt="Add this product to your bag" />
      </div>
    </article>
  );
};

export default ProductCard;
