import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartItemsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newitem
      state.cartItems.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizzza id
      state.cartItems = state.cartItems.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cartItems.find((item) => item.pizzaId === action.payload);
      console.log(item);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      const item = state.cartItems.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartItemsSlice.caseReducers.deleteItem(state, action);
    },
    clearcartItems(state) {
      state.cartItems = [];
    },
  },
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearcartItems } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;

//selectors

export const getCart = (state) => state.cart.cartItems;

export const getTotalCartQuantity = (state) =>
  state.cart.cartItems.reduce((sum, items) => sum + items.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cartItems.reduce((sum, items) => sum + items.totalPrice, 0);

export const getCurrentQuantity = (id) => (state) =>
  state.cart.cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0;
