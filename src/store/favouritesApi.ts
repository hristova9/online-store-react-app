import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/Product";

const API_URL = "http://localhost:3000";

export const favouritesApi = createApi({
  reducerPath: "favouritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getFavourites: builder.query<Product[], void>({
      query: () => "/favourites",
    }),
    getFavouriteItem: builder.query<Product, string>({
      query: (id) => `/favourites/${id}`,
    }),
    addToFavourites: builder.mutation<Product, Product>({
      query: (product) => ({
        url: "/favourites",
        method: "POST",
        body: product,
      }),
    }),
    removeFromFavourites: builder.mutation<void, string>({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFavouritesQuery,
  useGetFavouriteItemQuery,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
} = favouritesApi;