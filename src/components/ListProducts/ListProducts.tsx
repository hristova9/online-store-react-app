import { Product } from "../../models/Product";
import ListProductsItem from "../ListProductsItem/ListProductsItem";
import "./ListProducts.css";
import {
  useAddToBasketMutation,
  useGetBasketQuery,
} from "../../store/basketApi";
import { useAddToFavouritesMutation } from "../../store/favouritesApi";
import { handleError } from "../../utils/errorUtils";
import { useEffect, useState } from "react";
import ModalMessage from "../ModalMessage/ModalMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setBasket } from "../../store/basketSlice";
import { useGetProductsQuery } from "../../store/productApi";
import { AppDispatch, RootState } from "../../store/store";

const ListProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { data: products, error, isLoading } = useGetProductsQuery();
  const { data: basketProducts, refetch } = useGetBasketQuery();

  const [addToBasket] = useAddToBasketMutation();
  const [addToFavourites] = useAddToFavouritesMutation();

  // Keep Redux store in sync with API
  useEffect(() => {
    if (basketProducts) {
      dispatch(setBasket(basketProducts));
    }
  }, [basketProducts, dispatch]);

  const handleBuyClick = async (product: Product) => {
    const normalizedProduct = { ...product, id: String(product.id) };
    const existingItem = basketItems.find(
      (p: Product) => p.id === normalizedProduct.id
    );

    if (existingItem) {
      setModalMessage("This product is already in your cart!");
      setShowModal(true);
      return;
    }

    dispatch(addItem({ ...normalizedProduct, quantity: 1 }));

    try {
      await addToBasket({ ...normalizedProduct, quantity: 1 }).unwrap();
      setModalMessage("Product added to basket!");
      setShowModal(true);
      await refetch(); // Ensure API stays updated
    } catch (err) {
      handleError(err);
      alert("Failed to update basket.");
    }
  };

  const handleDetailsClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleFavouritesClick = async (product: Product) => {
    try {
      await addToFavourites(product).unwrap();
      alert("Product added to favourites!");
    } catch (err) {
      alert(`Failed to add to favourites: ${handleError(err)}`);
    }
  };

  if (isLoading) return <div className="loader">Loading products...</div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!products)
    return <h3 className="empty-message">No available products!</h3>;

  return (
    <>
      <div className="list-products-container">
        <h1 className="products-title">Products List</h1>
        <ul className="products-list">
          {products.map((product: Product) => (
            <ListProductsItem
              key={product.id}
              product={product}
              onBuyClick={() => handleBuyClick(product)}
              onDetailsClick={() => handleDetailsClick(product.id)}
              onFavouritesClick={() => handleFavouritesClick(product)}
            />
          ))}
        </ul>
      </div>
      <ModalMessage
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Message"
      >
        <p>{modalMessage}</p>
      </ModalMessage>
    </>
  );
};

export default ListProducts;
