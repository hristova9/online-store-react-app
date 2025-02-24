import { Product } from "../../models/Product";
import ListProductsItem from "../ListProductsItem/ListProductsItem";
import { useGetProductsQuery } from "../../store/productApi";
import "./ListProducts.css";

const ListProducts = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className="list-products-container">
      <ul className="products-list">
        {products?.map((product: Product) => <ListProductsItem key={product.id} product={product}/>)}
      </ul>
    </div>
  );
};

export default ListProducts;
