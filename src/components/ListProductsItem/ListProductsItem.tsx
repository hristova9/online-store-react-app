import React from "react";
import { Product } from "../../models/Product";
import "./ListProductsItem.css";
import HeartButton from "../HeartButton/HeartButton";
import ProductImage from "../ProductImage/ProductImage";
import ProductInfo from "../ProductInfo/ProductInfo";
import { useProductContext } from "../../services/ProductContext";

const ListProductsItem: React.FC<{ product: Product }> = ({ product }) => {
  const { handleAddToFavorites } = useProductContext();
  // const handleAddToFavorites = () => {
  //   console.log("Added to favorites:", product.title);
  // };

  // const handleBuyClick = () => {
  //   console.log("Product bought:", product.title);
  // };

  // const handleDetailsClick = () => {
  //   console.log("Product details:", product.title);
  // };
 
  return (
    <li className="product-item">
      <div className="product-card">
        <HeartButton onClick={() => handleAddToFavorites(product.id)} />
        <ProductImage image={product.image} alt={product.title} />
        <ProductInfo id={product.id} title={product.title} price={product.price} />
      </div>
    </li>
  );
};
export default ListProductsItem;
