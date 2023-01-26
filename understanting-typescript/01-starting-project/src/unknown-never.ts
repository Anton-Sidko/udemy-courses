// let userInput: any;
let userInput: unknown;
let userName: string;

userInput = 1;
userInput = 'cat';

// userName = userInput;
if (typeof userInput === 'string') {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message, code };
  // while(true){}
}

console.log(generateError('Test error', 42));

// const result = generateError('Test error', 42);
