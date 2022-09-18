// Exporting module
console.log('Exporting module');

const shippingCost = 10;
let cart = [];
console.log(cart);

// Named exports
const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { addToCart, totalPrice, totalQuantity as tq, cart };

// Default export
// export default function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// }

// export default addToCart;
