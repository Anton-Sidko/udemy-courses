"use strict";
let userInput;
let userName;
userInput = 1;
userInput = 'cat';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message, code };
}
console.log(generateError('Test error', 42));
