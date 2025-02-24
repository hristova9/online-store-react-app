import React from "react";
import Button from "../Button/Button";
import "./ProductInfo.css";

interface ProductInfoProps {
  id: number;
  title: string;
  price: number;
  onBuyClick: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ title, price, onBuyClick }) => {
  return (
    <div className="product-info">
      <h3 className="product-title">{title}</h3>
      <p className="product-price">${price.toFixed(2)}</p>
      <div className="product-buttons">
        <Button
          label="Buy"
          onClick={onBuyClick}
          className="btn-buy"
        />
        {/* <Button
          label="Details"
          onClick={() => handleDetailsClick(id)}
          className="btn-details"
        /> */}
      </div>
    </div>
  );
};

export default ProductInfo;
