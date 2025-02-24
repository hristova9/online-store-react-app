import React from "react";
import { Product } from "../../models/Product";
import "./ListProductsItem.css";
import HeartButton from "../HeartButton/HeartButton";
import ProductImage from "../ProductImage/ProductImage";
import ProductInfo from "../ProductInfo/ProductInfo";

interface ListProductsItemProps {
  product: Product;
  onBuyClick: (product: Product) => void;
  onFavouritesClick: (product: Product) => void;
}

const ListProductsItem: React.FC<ListProductsItemProps> = ({
  product,
  onBuyClick,
  onFavouritesClick
}) => {

  return (
    <li className="product-item">
      <div className="product-card">
        <HeartButton onClick={() => onFavouritesClick(product)} />
        <ProductImage image={product.image} alt={product.title} />
        <ProductInfo
          id={product.id}
          title={product.title}
          price={product.price}
          onBuyClick={() => onBuyClick(product)}
        />
      </div>
    </li>
  );
};
export default ListProductsItem;
