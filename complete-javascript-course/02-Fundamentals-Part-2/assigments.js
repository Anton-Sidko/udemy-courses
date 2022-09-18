function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and it's capital city is ${capitalCity}`;
}

const ukraine = describeCountry('Ukraine', 40, 'Kyiv');
const england = describeCountry('England', 50, 'London');
const usa = describeCountry('USA', 100, 'Washington');

console.log(ukraine);
console.log(england);
console.log(usa);

function percentageOfWorld1(population) {
  return population / 7900 * 100;
}

const percentageOfWorld2 = function (population) {
  return population / 7900 * 100;
}

const percentageUkraine1 = percentageOfWorld1(40);
const percentageUkraine2 = percentageOfWorld2(40);
const percentageEngland1 = percentageOfWorld1(50);
const percentageEngland2 = percentageOfWorld2(50);
const percentageUSA1 = percentageOfWorld1(100);
const percentageUSA2 = percentageOfWorld2(100);

console.log(percentageUkraine1, percentageUkraine2);
console.log(percentageEngland1, percentageEngland2);
console.log(percentageUSA1, percentageUSA2);

const percentageOfWorld3 = population => population / 7900 * 100;

console.log(percentageOfWorld3(30));

const describePopulation = function (country, population) {
  return `${country} has ${population} million people, which is about ${percentageOfWorld3(population)} of the world`
}

console.log(describePopulation('Ukraine', 40));

const populations = [40, 50, 150, 900];
console.log(populations.length === 4);

const percentages = [percentageOfWorld3(populations[0]), percentageOfWorld3(populations[1]), percentageOfWorld3(populations[2]), percentageOfWorld3(populations[populations.length - 1])];
console.log(percentages);

console.log('-----------------');
const neighbors = ['Poland', "Moldova", 'Romania'];
console.log(neighbors);
neighbors.push('Utopia');
console.log(neighbors);
neighbors.pop();
console.log(neighbors);

if (!neighbors.includes('Germany')) {
  console.log('Probably not a central European country :D');
}

const idx = neighbors.indexOf('Poland');
neighbors[idx] = 'Great Poland';
console.log(neighbors);
console.log('-------------------');

const myCountry = {
  country: 'Ukraine',
  capital: 'Kyiv',
  language: 'ukrainian',
  population: 40,
  neighbors: ['Poland', "Moldova", 'Romania', this.capital],
  describe: function () {
    console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} neighboring countries and a capital called ${this.capital}.`);
  },
  checkIsland: function () {
    this.isIsland = this.neighbors.length ? false : true;
    return this.isIsland;
  }

}
console.log(myCountry);
console.log('-------------------');

myCountry.population += 2;
myCountry['population'] -= 2;
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries and a capital called ${myCountry.capital}.`);
console.log('-------------------');

myCountry.describe();
console.log(myCountry.checkIsland());
console.log('-------------------');

for (let i = 0; i <= 50; i++) {
  console.log(`Voter number ${i} is currently voting`);
}
console.log('-------------------');

let percentages2 = [];
for (let i = 0; i < populations.length; i++) {
  percentages2.push(percentageOfWorld1(populations[i]));
}

console.log(percentages);
console.log(percentages2);
console.log('-------------------');

const listOfNeighbors = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Poland']];

for (let i = 0; i < listOfNeighbors.length; i++) {
  for (let j = 0; j < listOfNeighbors[i].length; j++) {
    console.log(listOfNeighbors[i][j]);
  }
}

console.log('-------------------');

let percentages3 = [];
let iterator = 0;
while (iterator < populations.length) {
  percentages3.push(percentageOfWorld2(populations[iterator]));
  iterator++;
}

console.log(percentages);
console.log(percentages2);
console.log(percentages3);
console.log('-------------------');


