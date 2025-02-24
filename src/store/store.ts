import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./productApi";
import { basketApi } from "./basketApi";
import { favouritesApi } from "./favouritesApi";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(basketApi.middleware)
      .concat(favouritesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;