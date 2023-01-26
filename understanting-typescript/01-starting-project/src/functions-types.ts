function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log('Result: ' + num);
}

function addAndHandler(n1: number, n2: number, cb: (a: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(7, 12));

let combinedValues: (a: number, b: number) => number;
combinedValues = add;
// combinedValues = 3;
// combinedValues = printResult;

console.log(combinedValues(3, 4));

addAndHandler(10, 12, num => console.log(num));
addAndHandler(10, 12, printResult);
