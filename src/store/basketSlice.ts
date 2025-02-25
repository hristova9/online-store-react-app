import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";

interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const normalizedId = String(action.payload.id);
      const existingItem = state.items.find(
        (p) => String(p.id) === normalizedId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, id: normalizedId });
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    setBasket: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, setBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
