import React, { useEffect } from "react";
import {
  useClearBasketMutation,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  removeItem,
  setBasket,
  updateItemQuantity,
  clearBasket,
} from "../../store/basketSlice";
import { useNavigate } from "react-router-dom";

const Basket: React.FC = () => {
  const {
    data: basketProducts,
    error,
    isLoading,
    refetch,
  } = useGetBasketQuery();
  const [clearBasketApi] = useClearBasketMutation();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeFromBasket] = useRemoveFromBasketMutation();
  const [addToFavourites] = useAddToFavouritesMutation();
  const [updateQuantity] = useUpdateProductQuantityMutation();

  useEffect(() => {
    if (basketProducts) {
      dispatch(setBasket(basketProducts));
    }
  }, [basketProducts, dispatch]);

  const handleRemoveFromBasket = async (productId: string) => {
    try {
      await removeFromBasket(productId).unwrap();
      dispatch(removeItem(productId));
    } catch (err) {
      alert(`Failed to remove product: ${handleError(err)}`);
    }
  };

  const handleFavouritesClick = async (product: Product) => {
    try {
      await addToFavourites(product).unwrap();
      alert("Product added to favourites!");
    } catch (err) {
      alert(`Failed to add to favourites: ${handleError(err)}`);
    }
  };

  const handleDecreaseQuantity = async (product: Product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      dispatch(updateItemQuantity(updatedProduct));
      await updateQuantity(updatedProduct).unwrap();
    }
  };

  const handleIncreaseQuantity = async (product: Product) => {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    dispatch(updateItemQuantity(updatedProduct));
    await updateQuantity(updatedProduct).unwrap();
  };

  const handleCheckout = async () => {
    try {
      await clearBasketApi(basketItems).unwrap();
      dispatch(clearBasket());
      await refetch();
      navigate("/");
    } catch (err) {
      handleError(err);
      alert("Failed to checkout. Please try again.");
    }
  };

  if (isLoading) return <p>Loading basket...</p>;
  if (error) return <p>Error fetching basket: {JSON.stringify(error)}</p>;

  return (
    <div className="basket-component">
      <h1 className="basket-title">Your Basket</h1>
      {basketItems.length === 0 ? (
        <h3 className="epmty-message">Your basket is empty!</h3>
      ) : (
        <div className="basket-list-container">
          <ul className="basket-list">
            {basketItems.map((product: Product) => (
              <BasketListItem
                key={product.id}
                product={product}
                onFavouritesClick={() => handleFavouritesClick(product)}
                onDetailsClick={() => navigate(`/products/${product.id}`)}
                onRemoveClick={() => handleRemoveFromBasket(product.id)}
                onDecreaseQuantity={() => handleDecreaseQuantity(product)}
                onIncreaseQuantity={() => handleIncreaseQuantity(product)}
              />
            ))}
          </ul>
          <Button
            onClick={handleCheckout}
            label="Checkout"
            className="btn-buy checkout-btn"
          />
        </div>
      )}
    </div>
  );
};

export default Basket;
