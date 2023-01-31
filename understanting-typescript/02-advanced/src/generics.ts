// const names: Array<string> = ['Anton', 'Sasha'];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('done');
//   }, 2000);

//   reject();
// });

// promise.then(data => data.split(''));

function merge<T extends object, U extends object>(objA: T, objB: U) {
  // return { ...objA, ...objB };
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'Anton' }, { age: 32, profession: 'developer' });
// const mergeObj2 = merge({ name: 'Anton' }, 100);

// console.log(merge({ name: 'Anton' }, { age: 32 }));
console.log(mergeObj);
// console.log(mergeObj2);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descrText = 'Got no value.';

  // if (element.length === 1) {
  //   descrText = `Got 1 element.`;
  // } else if (element.length > 1) {
  //   descrText = `Got ${element.length} elements.`;
  // }

  if (element.length > 0) {
    descrText = `Got ${element.length} element${
      element.length === 1 ? '' : 's'
    }.`;
  }

  return [element, descrText];
}

console.log(countAndDescribe('A'));
console.log(countAndDescribe('Test string'));
console.log(countAndDescribe([10]));
console.log(countAndDescribe([]));

// INFO keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

extractAndConvert({ name: 'Anton' }, 'name');

// INFO generics classes

// only for primitives
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  // BUG removes last element for not primitive items
  // removeItem(item: T) {
  //   this.data.splice(this.data.indexOf(item), 1); // indexOf will be -1(because for not primitive argument is a brand new object! for not stored in the variables)
  // }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

// textStorage.addItem(100);
textStorage.addItem('100');

const numberStorage = new DataStorage<number>();
const combineStorage = new DataStorage<number | string>();

// INFO Generic utility types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  // return { title, description, completeUntil: date };
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Anton', 'Sasha'];
// names.push('');
// names.pop();
