type Combinable = number | string;
type ResultLiteralType = 'as-number' | 'as-text';

function combine(
  input1: Combinable,
  input2: Combinable,
  resultType: ResultLiteralType
) {
  let result: Combinable;

  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (resultType === 'as-number') {
    result = +result;
  } else {
    result = result.toString();
  }

  return [result, typeof result];
}

const combinedAges = combine(32, 8, 'as-number');
const combinedStringAges = combine('32', '8', 'as-number');
const combineNames = combine('Anton ', 'Sasha', 'as-text');

console.log(combinedAges);
console.log(combinedStringAges);
console.log(combineNames);