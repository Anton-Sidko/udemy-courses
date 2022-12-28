import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // if not found, create new item
  // return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity > 1) {
    return cartItems.map(cartItem =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return cartItems.filter(item => item.id !== productToRemove.id);
  }

  // INFO code from lesson
  // find if cartItems contains productToRemove
  // const existingCartItem = cartItems.find(
  //   cartItem => cartItem.id === productToRemove.id
  // );
  // Check if quantity === 1, remove that product from cart
  // if (existingCartItem.quantity === 1) {
  //   return cartItems.filter(item => item.id !== productToRemove.id);
  // }
  // return cartItems with reduced quantity productToRemove
  // return cartItems.map(cartItem =>
  //   cartItem.id === productToRemove.id
  //     ? { ...cartItem, quantity: cartItem.quantity - 1 }
  //     : cartItem
  // );
};

const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter(item => item.id !== productToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

// initial state
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = newCartItems => {
    const newCartCount = newCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = productToRemove => {
    const newCartItems = removeCartItem(cartItems, productToRemove);

    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = productToClear => {
    const newCartItems = clearCartItem(cartItems, productToClear);

    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = bool => {
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
