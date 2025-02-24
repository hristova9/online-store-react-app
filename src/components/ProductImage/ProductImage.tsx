import React from 'react';
import "./ProductImage.css";

interface ProductImageProps {
  image: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, alt }) => {
  return <img src={image} alt={alt} className="product-image" />;
};

export default ProductImage;
