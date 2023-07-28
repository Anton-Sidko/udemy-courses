import { createSlice } from '@reduxjs/toolkit';

import { RootState, cartItemType } from '../../types';

const initialState: { cart: cartItemType[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((pizza) => pizza.pizzaId === action.payload);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((pizza) => pizza.pizzaId === action.payload);

      if (item) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item && item.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const getCart = (state: RootState) => state.cart.cart;

export const getCurrentQuantityById =
  (id: number | string) => (state: RootState) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
