"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["DEVELOPER"] = 2] = "DEVELOPER";
})(Role || (Role = {}));
const person = {
    name: 'Anton',
    age: 32,
    hobbies: ['read', 'computer games'],
    role: Role.DEVELOPER,
};
console.log(person);
