// let userInput: any;
var userInput;
var userName;
userInput = 1;
userInput = 'cat';
// userName = userInput;
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, code: code };
}
console.log(generateError('Test error', 42));
