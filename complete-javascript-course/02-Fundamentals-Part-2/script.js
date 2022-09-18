'use strict'
// const calcAverage = (a, b, c) => (a + b + c) / 3;
// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= avgKoalas * 2) {
//     return `Dolphins win (${avgDolphins} vs. ${avgKoalas})`
//   } else if (avgKoalas >= avgDolphins * 2) {
//     return `Koalas win (${avgKoalas} vs. ${avgDolphins})`
//   } else {
//     return 'No winner'
//   }
// }

// const avgDolphins1 = calcAverage(44, 23, 71);
// const avgKoalas1 = calcAverage(65, 54, 49);
// const avgDolphins2 = calcAverage(85, 54, 41);
// const avgKoalas2 = calcAverage(23, 34, 27);

// console.log(checkWinner(avgDolphins1, avgKoalas1));
// console.log(checkWinner(avgDolphins2, avgKoalas2));
// console.log('-----------------');



const calcTip = bill => bill <= 300 && bill >= 50 ? 0.15 * bill : 0.2 * bill;

// const bills = [125, 575, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// console.log(bills);
// console.log(tips);
// console.log(total);
console.log('-----------------');

console.log('Code challenge 4');
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [],
  total = [];

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  total.push(bills[i] + tips[i]);
}

console.log(bills);
console.log(tips);
console.log(total);

const calcAverage = function (arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
}

console.log(calcAverage(total));
console.log('-----------------');

const john = {
  firstName: 'John',
  lastName: 'Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / Math.pow(this.height, 2);
    return this.BMI;
  }
};

const mark = {
  firstName: 'Mark',
  lastName: 'Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / Math.pow(this.height, 2);
    return this.BMI;
  }
};

console.log(`${john.calcBMI() > mark.calcBMI() ? john.firstName : mark.firstName}'s BMI() (${john.calcBMI() > mark.calcBMI() ? john.calcBMI() : mark.calcBMI()}) is higher than ${john.calcBMI() > mark.calcBMI() ? mark.firstName : john.firstName}'s BMI(${john.calcBMI() > mark.calcBMI() ? mark.calcBMI() : john.calcBMI()})`);
console.log('-----------------');