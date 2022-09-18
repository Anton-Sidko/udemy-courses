'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.includes('Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} from ${getCode(
    from
  )} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(45);

  console.log(output);
}

// Data needed for first part of the section
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[1]);

const checkMiddleSeat = function (seat) {
  // B and E are middle seat
  const s = seat.slice(-1);
  return s === 'B' || s === 'E';
};

console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));

// Comparing emails
const email = 'hello@anton.io';
const loginEmail = '  Hello@Anton.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
/*
const weekdays = ['mon', 'tue', 'wed'];

const openingHours = {
  // ES6 enhanced object literals (computed property name)
  [weekdays[0]]: {
    open: 12,
    close: 22,
  },
  [`day-${2 + 4}`]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  // ES6 enhanced object literals
  order(starterIdx, mainIdx) {
    return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  },

  orderDelivery: function ({ starterIdx, mainIdx, time, address }) {
    console.log(starterIdx, mainIdx, time, address);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIng, ...otherIngs) {
    console.log(mainIng, otherIngs);
  },
};

const restaurant1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const restaurant2 = {
  name: 'La Pizza',
  owner: 'Mario',
};

// OR assignment operator
// restaurant1.numGuests = restaurant1.numGuests || 10;
// restaurant2.numGuests = restaurant2.numGuests || 10;
// restaurant1.numGuests ||= 10;
// restaurant2.numGuests ||= 10;

// Logical nullish assignment (null or undefined)
restaurant1.numGuests ??= 10;
restaurant2.numGuests ??= 10;

// Logical and operator
// restaurant2.owner = restaurant2.owner && 'Luigi';
restaurant1.owner &&= 'Luigi';
restaurant2.owner &&= 'Luigi';

console.table(restaurant1);
console.table(restaurant2);

/*
// SPREAD, because RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// FUnctions
const add = function (...numbers) {
  console.log(numbers);
};

add(2, 3);
add(4, 5, 2, 34);

restaurant.orderPizza('cat', 'vegetables', 'meat');


// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];

// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// Objects spread
const newRestaurant = { ...restaurant, founder: 'Kitty' };
console.log(newRestaurant);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del',
  mainIdx: 2,
  starterIdx: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating varibles
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested obj
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables
// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// // Receive 2 return values from a fn
// const [starter, mainCourse] = restaurant.order(2, 0);
// // console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
//  const [i, , j] = nested;
// // console.log(i, j);*/
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p = 1, q = 2, r = 3] = [8, 9];
// console.log(p, q, r);*/
