import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/Product";

const API_URL = "http://localhost:3000";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getBasket: builder.query<Product[], void>({
      query: () => "/basket",
    }),
    addToBasket: builder.mutation<Product, Product>({
      query: (product) => ({
        url: "/basket",
        method: "POST",
        body: product,
      }),
    }),
    removeFromBasket: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/basket/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBasketQuery,
  useAddToBasketMutation,
  useRemoveFromBasketMutation,
} = basketApi;