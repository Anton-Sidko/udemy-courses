// Importing module

// Named import
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('apple', 3);
// console.log(price, tq);

import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('cheese', 8);
ShoppingCart.addToCart('pizza', 1);
ShoppingCart.addToCart('bread', 3);
console.log(ShoppingCart.totalPrice);
console.log(ShoppingCart.tq);

// Default import

// import add from './shoppingCart.js';

console.log('Importing module');

// ShoppingCart.add('egg', 12);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

console.log('Anton' ?? null);

console.log(ShoppingCart.cart.find(el => el.quantity >= 2));

import 'core-js/stable';

// Polifilling async functions
import 'regenerator-runtime/runtime';
