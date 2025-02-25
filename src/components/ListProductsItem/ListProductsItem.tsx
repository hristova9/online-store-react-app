import React from "react";
import { Product } from "../../models/Product";
import "./ListProductsItem.css";
import ProductImage from "../ProductImage/ProductImage";
import Button from "../Button/Button";

interface ListProductsItemProps {
  product: Product;
  onBuyClick: (product: Product) => void;
  onDetailsClick:(id: string) => void;
  onFavouritesClick: (product: Product) => void;
}

const ListProductsItem: React.FC<ListProductsItemProps> = ({
  product,
  onBuyClick,
  onDetailsClick,
}) => {
  return (
    <li className="product-item">
      <div className="product-card">
        <ProductImage
          image={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-title-list">{product.title}</h3>
          <p className="product-price-list">${product.price.toFixed(2)}</p>
          <div className="product-buttons">
            <Button
              label="Buy"
              onClick={() => onBuyClick(product)}
              className="btn-buy"
            />
            <Button
              label="Details"
              onClick={() => onDetailsClick(product.id)}
              className="btn-details"
            />
          </div>
        </div>
      </div>
    </li>
  );
};
export default ListProductsItem;
