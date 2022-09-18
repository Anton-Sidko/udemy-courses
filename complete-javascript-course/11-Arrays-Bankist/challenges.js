'use strict';
console.log('Challenge 1');
const juliaData1 = [3, 5, 2, 12, 7];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData1 = [4, 1, 15, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const onlyDogs = dogsJulia.slice(1, -2);
  const dogsAge = [...onlyDogs, ...dogsKate];

  dogsAge.forEach((dogAge, i) => {
    console.log(
      `Dog number ${i + 1} is ${
        dogAge >= 3 ? `an adult, and ${dogAge} years old` : 'still a puppy 🐶'
      }`
    );
  });
};

checkDogs(juliaData1, kateData1);
checkDogs(juliaData2, kateData2);
console.log('----------------------');

console.log('Challenge 2');
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const filterAges = humanAges.filter(age => age >= 18);

//   const AverageHumanAge =
//     // filterAges.reduce((acc, age) => acc + age, 0) / filterAges.length;
//     filterAges.reduce((acc, age, _, arr) => acc + age / arr.length, 0);

//   return AverageHumanAge;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
console.log('----------------------');

console.log('Challenge 3');
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
console.log('----------------------');

console.log('Challenge 4');
const isEatOK = dog => {
  return (
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
  );
};

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

// 2
console.log(dogs.find(dog => dog.owners.includes('Sarah')));

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
console.log(dogs.some(isEatOK));

// 7
const dogEatOK = dogs.filter(isEatOK);
console.log(dogEatOK);

// 8
console.log([...dogs].sort((a, b) => a.recommendedFood - b.recommendedFood));
console.log(dogs);

console.log('----------------------');
