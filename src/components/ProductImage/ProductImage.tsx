import React from "react";
import "./ProductImage.css";

interface ProductImageProps {
  image: string;
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  image,
  alt,
  className,
}) => {
  return <img src={image} alt={alt} className={className} />;
};

export default ProductImage;
