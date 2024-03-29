function addNumbers(
  n1: number,
  n2: number,
  showResult: boolean,
  phrase: string
) {
  const result = n1 + n2;

  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

let number1 = 5;
const number2 = 10;
const printResults = true;
const resultPhrase = 'Result is: ';

const result1 = addNumbers(number1, number2, printResults, resultPhrase);
