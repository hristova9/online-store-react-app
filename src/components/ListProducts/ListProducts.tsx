import { Product } from "../../models/Product";
import ListProduct from "../ListProduct/ListProduct";
import { useGetProductsQuery } from "../../store/productApi";

const ListProducts = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className="list-products-container">
      <ul className="products-list">
        {products?.map((product: Product) => <ListProduct key={product.id} product={product}/>)}
      </ul>
    </div>
  );
};

export default ListProducts;
