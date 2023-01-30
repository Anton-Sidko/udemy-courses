type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee{}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Anton',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);

  // INFO type guard
  if ('privileges' in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }

  // INFO type guard
  if ('startDate' in emp) {
    console.log(`startDate: ${emp.startDate}`);
  }
}

printEmployeeInfo(e1);

// INFO Discrimination unions
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      speed = 0;
  }

  console.log(`Moving with speed: ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 50 });

// INFO Type casting

// const userInput = <HTMLInputElement>document.getElementById('message')!;
// const userInput = document.getElementById('message')! as HTMLInputElement;
const userInput = document.getElementById('message');

if (userInput) {
  (userInput as HTMLInputElement).value = 'Hi there!';
}

// INFO Index properties

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  userName: 'Too short',
};

// INFO Function overloads

function addTwo(a: number, b: number): number;
function addTwo(a: string, b: string): string;
function addTwo(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = addTwo(1, 5);
const result1 = addTwo('text', 'str');
