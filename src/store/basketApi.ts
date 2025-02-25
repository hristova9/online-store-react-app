import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/Product";
// import { AppDispatch } from "./store";
// import { ThunkAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    getBasket: builder.query<Product[], void>({
      query: () => "/basket",
      providesTags: ["Basket"],
    }),
    addToBasket: builder.mutation<Product, Product>({
      query: (product) => ({
        url: "/basket",
        method: "POST",
        body: product,
    }),
       
        // async onQueryStarted(
        //   product: Product,
        //   {
        //     dispatch,
        //     queryFulfilled,
        //   }: {
        //     dispatch: AppDispatch;
        //     queryFulfilled: Promise<{ data: Product }>;
        //   }
        // ) {
        //   const patchResult = dispatch(
        //     basketApi.util.updateQueryData("getBasket", undefined, (draft) => {
        //       draft.push({ ...product, quantity: 1 });
        //     })
        //   );
        //   try {
        //     await queryFulfilled;
        //   } catch {
        //     patchResult.undo();
        //   }
        // },
    //   }),
    }),
    removeFromBasket: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/basket/${productId}`,
        method: "DELETE",
        invalidatesTags: ["Basket"],
      }),
    }),
    updateProductQuantity: builder.mutation<Product, Product>({
      query: (product) => ({
        url: `/basket/${product.id}`,
        method: "PUT",
        body: product,
        invalidatesTags: ["Basket"],
      }),
    }),
    clearBasket: builder.mutation<void, Product[]>({
        queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
          const basket = await fetchWithBQ("/basket");
          if (basket.error) return { error: basket.error };
  
          const deletePromises = (basket.data as Product[]).map((item) =>
            fetchWithBQ({ url: `/basket/${item.id}`, method: "DELETE" })
          );
  
          await Promise.all(deletePromises);
          return { data: undefined };
        },
      }),
  }),
});

export const {
  useGetBasketQuery,
  useAddToBasketMutation,
  useRemoveFromBasketMutation,
  useUpdateProductQuantityMutation,
  useClearBasketMutation,
} = basketApi;
