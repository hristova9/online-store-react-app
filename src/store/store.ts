import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./productApi";
import { basketApi } from "./basketApi";
import { favouritesApi } from "./favouritesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import basketReducer from "./basketSlice"; 

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(basketApi.middleware)
      .concat(favouritesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;