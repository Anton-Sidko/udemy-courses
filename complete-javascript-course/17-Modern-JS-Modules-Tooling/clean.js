'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (user, limit) => limit?.[user] ?? 0;

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // if (!user) user = 'jonas';
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  // const limit = spendingLimits?.[user] ?? 0;

  return value <= getLimit(cleanUser, limits)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;

  // budget.push({ value: -value, description, user: cleanUser });
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
// //
// console.log(budget);
// console.log(newBudget1);
// console.log(newBudget2);

const checkExpenses = function (state, limits) {
  // let limit;
  // if (spendingLimits[entry.user]) {
  //   lim = spendingLimits[entry.user];
  // } else {
  //   lim = 0;
  // }

  // for (const entry of state)
  //   if (entry.value < -getLimit(entry.user, limits)) entry.flag = 'limit';
  return state.map(entry =>
    entry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry
  );
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';

  // // if (entry.value <= -bigLimit) {
  // //   // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
  // //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
  // // }

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  // const bigExpenses = state
  //   .filter(entry => entry.value <= -bigLimit)
  //   .map(entry => entry.description.slice(-2))
  //   .join(' / ');

  // Impure cause console.log
  const bigExpenses = state.reduce(
    (acc, cur) =>
      cur.value <= -bigLimit
        ? `${acc}${acc ? ' / ' : ''}${cur.description.slice(-2)}`
        : acc,
    ''
  );

  console.log(bigExpenses);
};

// console.log(budget);
logBigExpenses(finalBudget, 1000);
