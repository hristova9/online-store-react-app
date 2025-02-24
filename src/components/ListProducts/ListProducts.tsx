import { Product } from "../../models/Product";
import ListProductsItem from "../ListProductsItem/ListProductsItem";
import { useGetProductsQuery } from "../../store/productApi";
import "./ListProducts.css";
import { useAddToBasketMutation } from "../../store/basketApi";
import { useAddToFavouritesMutation } from "../../store/favouritesApi";
import { handleError } from "../../utils/errorUtils";

const ListProducts = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [addToBasket] = useAddToBasketMutation();
  const [addToFavourites] = useAddToFavouritesMutation();

  const handleBuyClick = async (product: Product) => {
    try {
      await addToBasket(product).unwrap();
      alert("Product added to basket!");
    } catch (err: unknown) {
      const errorMessage = handleError(err);
      alert(`Failed to add to basket: ${errorMessage}`);
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
    <div className="list-products-container">
      <ul className="products-list">
        {products?.map((product: Product) => (
          <ListProductsItem
            key={product.id}
            product={product}
            onBuyClick={() => handleBuyClick(product)}
            onFavouritesClick={() => handleFavouritesClick(product)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListProducts;
