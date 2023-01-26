"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
function addAndHandler(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
printResult(add(7, 12));
let combinedValues;
combinedValues = add;
console.log(combinedValues(3, 4));
addAndHandler(10, 12, num => console.log(num));
addAndHandler(10, 12, printResult);
