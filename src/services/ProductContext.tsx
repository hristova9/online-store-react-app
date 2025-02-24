import React, { createContext, useContext } from "react";

interface ProductContextType {
  handleAddToFavorites: (productId: number) => void;
  handleBuyClick: (productId: number) => void;
  handleDetailsClick: (productId: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const handleAddToFavorites = (productId: number) => {
    console.log("Added to favorites:", productId);
    // Add logic for adding to favorites (e.g., update state or context)
  };

  const handleBuyClick = (productId: number) => {
    console.log("Product bought:", productId);
    // Add logic for buying the product
  };

  const handleDetailsClick = (productId: number) => {
    console.log("Product details:", productId);
    // Add logic for showing product details
  };

  return (
    <ProductContext.Provider
      value={{ handleAddToFavorites, handleBuyClick, handleDetailsClick }}
    >
      {children}
    </ProductContext.Provider>
  );
};
