// Challenge 1
console.log('----------------------------------');
console.log('Challenge 1');

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    ['Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze'],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// const { team1, x: draw, team2 } = game.odds;
const {
  odds: { team1, x: draw, team2 },
} = game;

const printGoals = function (...players) {
  console.log(...players, players.length);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7
team1 < team2 && console.log('Team 1 to win');
team2 < team1 && console.log('Team 2 to win');

// console.log(players1);
// console.log(players2);
// console.log(gk, fieldPlayers);
// console.log(allPlayers);
// console.log(players1Final);
// console.log(team1, draw, team2);

console.log('----------------------------------');

console.log('Challenge 2');

for (const [index, player] of game.scored?.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

let averageOdds = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  averageOdds += odd;
}
averageOdds /= odds.length;
console.log(averageOdds);

for (const [team, odd] of Object.entries(game.odds)) {
  console.log(`Odd of${game[team] ? ' victory' : ''} ${game[team] ?? 'draw'}: ${odd}`);
}

let scorers = {};
for (const player of game.scored) {
  scorers[player] = (scorers[player] ?? 0) + 1;
}
console.log(scorers);

console.log('----------------------------------');

console.log('Challenge 3');

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔃 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔃 Substitution'],
  [64, '🟡 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔃 Substitution'],
  [72, '🔃 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟡 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes.`);

for (const [time, event] of gameEvents) {
  console.log(`${time <= 45 ? '[FIRST' : '[SECOND'} HALF] ${time}: ${event}`);
}

console.log('----------------------------------');

console.log('Challenge 4');
// Modify document
//  My solution
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const input = document.querySelector('textarea');
const btn = document.querySelector('button');

// const convertToCamelCase = function () {
//   const inputText = input.value;
//   let rows = inputText.toLowerCase().split('\n');

//   text = rows
//     .map(item => {
//       item = item.trim().split('_');
//       item[1] = item[1].replace(item[1][0], item[1][0].toUpperCase());
//       return item.join('');
//     })
//     .map((word, i) => `${word} ${'✅'.repeat(i + 1)}`);

//   console.log(text.join('\n'));
// };

// Jonas solution

const convertToCamelCase = function () {
  const inputText = input.value;
  const rows = inputText.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;

    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
};

btn.addEventListener('click', convertToCamelCase);

console.log('----------------------------------');
