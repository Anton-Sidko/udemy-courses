import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = productToRemove => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = productToClear => {
    setCartItems(clearCartItem(cartItems, productToClear));
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
