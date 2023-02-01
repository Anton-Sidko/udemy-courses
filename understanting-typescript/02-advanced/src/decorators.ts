// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// INFO Decorator factories
function Logger(logString: string) {
  console.log('Logger FACTORY 🏭');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// INFO decorator return class, it execute only when instantiate this class
function WithTemplate(template: string, hookId: string) {
  console.log('Template FACTORY 🏭');

  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();

        console.log('Rendering template...');

        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@Logger('Logging - Person class')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Anton';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
console.log(person);

// INFO property decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log('----- Property decorator -----');
  console.log(target, propertyName);
}

// INFO accessor decorator

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('----- Accessor decorator -----');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// INFO method decorator
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('----- Method decorator -----');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// INFO parameter decorator
function Log4(target: any, name: string, position: number) {
  console.log('----- Parameter decorator -----');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;

  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error('Price should be positive!');
    }
  }

  constructor(t: string, private _price: number) {
    this.title = t;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// INFO Auto-bind decorator

function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

class Printer {
  message = '🖨 This works 🖨';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

p.showMessage();

// INFO decorators for validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProps: string]: string[]; //['required','positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function RequiredProp(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positiveNumber',
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) return true;

  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positiveNumber':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }

  return isValid;
}

class Course {
  @RequiredProp
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const createCourse = (event: Event) => {
  event.preventDefault();

  const titleEL = document.getElementById('title') as HTMLInputElement;
  const priceEL = document.getElementById('price') as HTMLInputElement;

  const title = titleEL.value;
  const price = +priceEL.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    const err = new Error('Invalid input! 👎');
    console.error(err);
    return;
  }

  console.log(createdCourse);
};

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', createCourse);
