function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
function addAndHandler(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(7, 12));
var combinedValues;
combinedValues = add;
// combinedValues = 3;
// combinedValues = printResult;
console.log(combinedValues(3, 4));
addAndHandler(10, 12, function (num) { return console.log(num); });
addAndHandler(10, 12, printResult);
