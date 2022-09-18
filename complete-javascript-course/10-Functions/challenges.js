'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    // if (
    //   typeof answer === 'number' &&
    //   answer >= 0 &&
    //   answer < this.answers.length
    // ) {
    //   this.answers[answer] += 1;
    // }
    typeof answer === 'number' &&
      answer >= 0 &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    switch (type) {
      case 'array':
        console.log(this.answers);
        break;
      case 'string':
        console.log(`Poll results are ${this.answers.join(', ')}`);
        break;
      default:
        console.log(this.answers);
        break;
    }
  },
};

// const testBonus1 = {
//   answers: [5, 2, 3],
// };
// const testBonus2 = {
//   answers: [1, 5, 3, 9, 6, 1],
// };

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const displayResults = poll.displayResults;

// displayResults.call(testBonus1);
// displayResults.call(testBonus1, 'string');
// displayResults.call(testBonus2);
// displayResults.call(testBonus2, 'string');

// Jonas
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
