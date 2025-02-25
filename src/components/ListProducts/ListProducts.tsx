import { Product } from "../../models/Product";
import ListProductsItem from "../ListProductsItem/ListProductsItem";
import { useGetProductsQuery } from "../../store/productApi";
import "./ListProducts.css";
import {
  useAddToBasketMutation,
  useGetBasketQuery,
} from "../../store/basketApi";
import { useAddToFavouritesMutation } from "../../store/favouritesApi";
import { handleError } from "../../utils/errorUtils";
import { useEffect, useState } from "react";
import ModalMessage from "../ModalMessage/ModalMessage";

const ListProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    data: products,
    error,
    isLoading,
    isSuccess: productsSuccess,
  } = useGetProductsQuery();
  const { data: basketProducts, isSuccess: basketSuccess } =
    useGetBasketQuery();
  const [transformedProducts, setTransformedProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Product[]>([]);

  const [addToBasket] = useAddToBasketMutation();
  const [addToFavourites] = useAddToFavouritesMutation();

  useEffect(() => {
    if (basketSuccess && basketProducts) {
      setBasket(basketProducts);
    }
  }, [basketSuccess, basketProducts]);

  useEffect(() => {
    if (productsSuccess && products) {
      const newProducts = products.map((product: Product) => ({
        ...product,
        id: String(product.id),
        quantity: 0,
      }));
      setTransformedProducts(newProducts);
    }
  }, [products, productsSuccess]);

  const handleBuyClick = async (product: Product) => {
    let isInBasket = false;
    if (basket) {
      isInBasket = basket.some((p: Product) => p.id === product.id);
    }
    if (isInBasket) {
      setModalMessage("This product is already in your cart!");
      setShowModal(true);
    } else {
      product.quantity++;
      try {
        await addToBasket(product).unwrap();
        setBasket((prevBasket) => [...(prevBasket || []), product]);
        alert("Product added to basket!");
      } catch (err) {
        const errorMessage = handleError(err);
        alert(`Failed to add to basket: ${errorMessage}`);
      }
    }
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      <div className="list-products-container">
        <ul className="products-list">
          {transformedProducts?.map((product: Product) => (
            <ListProductsItem
              key={product.id}
              product={product}
              onBuyClick={() => handleBuyClick(product)}
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
