interface Named {
  readonly name: string;
  surname?: string;
}

interface Greet extends Named, Aged {
  greet(phrase: string): void;
}

interface Aged {
  age: number;
}

let user1: Greet;

user1 = {
  name: 'Anton',
  age: 16,
  greet(phrase) {
    console.log(`${phrase}, ${this.name}`);
  },
};

user1.greet('Hi');

class Person implements Greet, Aged {
  // name:string;

  constructor(public name: string, public age: number) {}

  greet(phrase: string) {
    console.log(`${phrase}, ${this.name}`);
  }
}

// INFO function type
type AddFn = (a: number, b: number) => number;
let add: AddFn;

// INFO function interface
interface MultiplyFn {
  (a: number, b: number): number;
}
let multiply: MultiplyFn;
