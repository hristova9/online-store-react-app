import React from "react";
import { Product } from "../../models/Product";
import HeartButton from "../HeartButton/HeartButton";
import ProductImage from "../ProductImage/ProductImage";
import "./BasketListItem.css";
import Button from "../Button/Button";

interface BasketListItemProps {
  product: Product;
  onFavouritesClick: () => void;
  onRemoveClick: () => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
}

const BasketListItem: React.FC<BasketListItemProps> = ({
  product,
  onFavouritesClick,
  onRemoveClick,
  onDecreaseQuantity,
  onIncreaseQuantity
}) => {
  return (
    <li className="basket-item">
      <div className="product-card-basket">
        <HeartButton onClick={onFavouritesClick} />
        <ProductImage
          image={product.image}
          alt={product.title}
          className="product-image-basket"
        />
        <div className="basket-info-container">
          <div className="product-info-basket">
            <h3 className="product-title-basket">{product.title}</h3>
            <p className="product-price-basket">${product.price.toFixed(2)}</p>
          </div>
          <div className="product-buttons-basket">
          <div className="quantity-container">
            <button className="quantity-btn" onClick={onDecreaseQuantity}>-</button>
            <span className="quantity-display">{product.quantity}</span>
            <button className="quantity-btn" onClick={onIncreaseQuantity}>+</button>
          </div>
            {/* <Button
          label="Details"
        //   onClick={() => handleDetailsClick(id)}
          className="btn-details"
        /> */}
        
            <Button onClick={onRemoveClick} label="Remove" className="btn-remove" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default BasketListItem;
