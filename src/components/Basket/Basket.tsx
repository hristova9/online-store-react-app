import React, { useEffect } from "react";
import {
  useGetBasketQuery,
  useRemoveFromBasketMutation,
  useUpdateProductQuantityMutation,
} from "../../store/basketApi";
import "./Basket.css";
import Button from "../Button/Button";
import BasketListItem from "../BasketListItem/BasketListItem";
import { useAddToFavouritesMutation } from "../../store/favouritesApi";
import { handleError } from "../../utils/errorUtils";
import { Product } from "../../models/Product";

const Basket: React.FC = () => {
  const { data: basketProducts, error, isLoading } = useGetBasketQuery();
  const [localBasket, setLocalBasket] = React.useState<Product[]>(
    basketProducts || []
  );

  const [removeFromBasket] = useRemoveFromBasketMutation();
  const [addToFavourites] = useAddToFavouritesMutation();
  const [updateQuantity] = useUpdateProductQuantityMutation();

  useEffect(() => {
    if (basketProducts) {
      setLocalBasket(basketProducts);
    }
  }, [basketProducts]);

  const handleRemoveFromBasket = async (productId: string) => {
    try {
      await removeFromBasket(productId).unwrap();
      setLocalBasket((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    } catch (err) {
        handleError(err);
      alert("Failed to remove product!");
    }
  };

  const handleCheckout = () => { //remove all from the basket ----
    alert("Proceeding to checkout!");
  };

  const handleFavouritesClick = async (product: Product) => {
    try {
      await addToFavourites(product).unwrap();
      alert("Product added to favourites!");
    } catch (err: unknown) {
      const errorMessage = handleError(err);
      alert(`Failed to add to favourites: ${errorMessage}`);
    }
  };

  const handleDecreaseQuantity = async (product: Product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      updateQuantity(updatedProduct);
      updateLocalQuantity(updatedProduct);
    } else {
      alert("You need to remove the product from the basket!");
    }
  };

  const handleIncreaseQuantity = async (product: Product) => {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    updateQuantity(updatedProduct);
    updateLocalQuantity(updatedProduct);
  };

  const updateLocalQuantity = (updatedProduct: Product) => {
    setLocalBasket((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  if (isLoading) return <p>Loading basket...</p>;
  if (error) return <p>Error fetching basket: {JSON.stringify(error)}</p>;

  return (
    <div className="basket-component">
      <h1>Your Basket</h1>
      {!basketProducts || basketProducts.length === 0 ? (
        <p>Your basket is empty!</p>
      ) : (
        <div className="basket-list-container">
          <ul className="basket-list">
            {localBasket.map((product) => (
              <BasketListItem
                key={product.id}
                product={product}
                onFavouritesClick={() => handleFavouritesClick(product)}
                onRemoveClick={() => handleRemoveFromBasket(product.id)}
                onDecreaseQuantity={() => handleDecreaseQuantity(product)}
                onIncreaseQuantity={() => handleIncreaseQuantity(product)}
              />
            ))}
          </ul>
          <div className="checkout-btn">
            <Button
              onClick={handleCheckout}
              label="Checkout"
              className="btn-buy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
