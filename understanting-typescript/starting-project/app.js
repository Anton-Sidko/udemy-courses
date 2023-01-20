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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["DEVELOPER"] = 2] = "DEVELOPER";
})(Role || (Role = {}));
var person = {
    name: 'Anton',
    age: 32,
    hobbies: ['read', 'computer games'],
    role: Role.DEVELOPER
};
console.log(person);
