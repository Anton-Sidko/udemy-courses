// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; //INFO tuple
// } = {
//   // const person = {
//   name: 'Anton',
//   age: 32,
//   hobbies: ['read', 'computer games'],
//   role: [2, 'developer'], //INFO tuple
// };

enum Role {
  ADMIN,
  READ_ONLY,
  DEVELOPER,
}

const person = {
  name: 'Anton',
  age: 32,
  hobbies: ['read', 'computer games'],
  role: Role.DEVELOPER,
};

console.log(person);
