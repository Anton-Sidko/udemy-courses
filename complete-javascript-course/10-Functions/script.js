'use strict';

const greet = greeting => name => console.log(`${greeting} ${name}`);

greet('Hi')('Anton');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'Sasha'); not work
// Call method
book.call(eurowings, 23, 'Sasha');
book.call(lufthansa, 123, 'Julia');
lufthansa.book(239, 'Anton');

// Apply method - not use in modern JS
const flightData = [483, 'Anton'];
book.apply(eurowings, flightData);

book.call(eurowings, ...flightData); //modern JS

// Bind method
const bookEW = book.bind(eurowings);

bookEW(523, 'Anton');

console.log(lufthansa.bookings);
console.log(eurowings.bookings);

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

/*
const flight = 'LH234';
const passenger = {
  name: 'Anton Sidko',
  passport: 136574354,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 136574354) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, passenger);
console.log(flight, passenger);

/*
const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('KH123', 2, 50);
createBooking('KH123', 2);
createBooking('KH123', undefined, 1000);
*/
