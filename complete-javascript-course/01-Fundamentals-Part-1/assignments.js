const country = 'Ukraine';
const continent = 'Europe';
let population = 40;

console.log(country);
console.log(continent);
console.log(population);

const isIsland = false;
let language;

console.log(typeof country);
console.log(typeof population);
console.log(typeof isIsland);
console.log(typeof language);

language = 'ukrainian';

console.log(population / 2);
console.log(population > 6);
console.log(population < 33);

const description = `${country} is in ${continent}, and it's ${population} million people speak ${language}`;

console.log(description);

if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(`${country}'s  population is ${33 - population} million below average`);
}

/*
const numNeighbors = +prompt('How many neighbor countries does your country have?');

if (numNeighbors === 1) {
  console.log('Only 1 border!');
} else if (numNeighbors > 1) {
  console.log('More than 1 border');
} else {
  console.log('No borders');
}
*/
if (language === 'english' && population < 50 && !isIsland) {
  console.log(`You should live in ${country}:)`);
} else {
  console.log(`${country} does not meet your criteria :(`);
}

switch (language) {
  case 'chinese':
  case 'mandarin':
    console.log('MOST number of native speakers!');
    break;
  case 'spanish':
    console.log('2nd place in number of native speakers');
    break;
  case 'english':
    console.log('3rd place');
    break;
  case 'hindi':
    console.log('Number 4');
    break;
  case 'arabic':
    console.log('5th most spoken language');
    break;
  default:
    console.log('Great language too');
}

population > 33 ? console.log(`${country}'s population is above average`) : console.log(`${country}'s population is below average`);