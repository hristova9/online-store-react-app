import React, { lazy, Suspense } from "react";
const ListProducts = lazy(() => import("../../components/ListProducts/ListProducts"));

const ListProductPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="fallback-loader">Loading products...</div>}>
      <ListProducts />
    </Suspense>
  );
};

export default ListProductPage;
