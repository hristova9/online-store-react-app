import React from "react";
import { Product } from "../../models/Product";
import "./ListProduct.css";
import { FaHeart } from "react-icons/fa";

const ListProduct: React.FC<{ product: Product }> = ({ product }) => {
 
  return (
    <li className="product-item">
      <div className="product-card">
        <button className="heart-button">
          <FaHeart size={24} />
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-buttons">
            <button className="btn-buy">Buy</button>
            <button className="btn-details">Details</button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ListProduct;
