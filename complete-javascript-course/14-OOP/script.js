'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this!!! use prototype inheritance
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const anton = new Person('Anton', 1990);
console.log(anton instanceof Person);
console.log(anton);
// anton.calcAge();

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

anton.calcAge();
