/*
let js = 'amazing';
console.log(40 + 8 + 23 - 10);

let firstName = 'Anton';
console.log(firstName);
*/


// Codding challenge 1

console.log('Codding challenge 1');

const weightOfMark = 93;
const heightOfMark = 1.82;

const weightOfJohn = 85;
const heightOfJohn = 1.76;

const bmiMark = weightOfMark / heightOfMark ** 2;
const bmiJohn = weightOfJohn / heightOfJohn ** 2;

const markHigherBMI = bmiMark > bmiJohn;

console.log(bmiMark, bmiJohn);
console.log(markHigherBMI);

console.log('End Codding challenge 1');
console.log('------------');

// Codding challenge 2

if (markHigherBMI) {
  console.log(`Mark's BMI (${bmiMark.toFixed(2)}) is higher than John's (${bmiJohn.toFixed(2)})!`);
} else {
  console.log(`John's BMI (${bmiJohn.toFixed(2)}) is higher than Mark's (${bmiMark.toFixed(2)})!`);
}

console.log('End Codding challenge 2');
console.log('------------');

// Codding challenge 3
const averageScoresDolphins = (97 + 112 + 2) / 3;
const averageScoresKoalas = (109 + 95 + 16) / 3;

if (averageScoresDolphins === averageScoresKoalas && averageScoresDolphins >= 100 && averageScoresKoalas >= 100) {
  console.log('Draw');
} else if (averageScoresDolphins > averageScoresKoalas && averageScoresDolphins >= 100) {
  console.log('Dolphins wins');
} else if (averageScoresKoalas >= 100 && averageScoresDolphins < averageScoresKoalas) {
  console.log('Koalas wins');
} else {
  console.log('All lose 😥');
}

console.log('End Codding challenge 3');
console.log('------------');

// Codding challenge 4
const bill1 = 275;
const bill2 = 40;
const bill3 = 430;

const tip1 = bill1 <= 300 && bill1 >= 50 ? 0.15 * bill1 : 0.2 * bill1;
const tip2 = bill2 <= 300 && bill2 >= 50 ? 0.15 * bill2 : 0.2 * bill1;
const tip3 = bill3 <= 300 && bill3 >= 50 ? 0.15 * bill3 : 0.2 * bill1;

console.log(`The bill was ${bill1}, the tip was ${tip1}, and the total value ${bill1 + tip1}`);
console.log(`The bill was ${bill2}, the tip was ${tip2}, and the total value ${bill2 + tip2}`);
console.log(`The bill was ${bill3}, the tip was ${tip3}, and the total value ${bill3 + tip3}`);

console.log('End Codding challenge 4');
console.log('------------');
