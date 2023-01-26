abstract class Department {
  static fiscalYear = 2023;
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(): void;

  addEmployee(employee: string) {
    // this.id ='ch';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees);
    console.log(this.employees.length);
  }
}

class ITDepartment extends Department {
  // public admins: string[];
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    // this.admins = admins;
  }

  describe(): void {
    console.log(`IT Department: (${this.id})-${this.name}`);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get getLastReport() {
    if (this.lastReport) return this.lastReport;

    throw new Error('No report found.');
  }

  set setLastReport(value: string) {
    if (!value) throw new Error('No report value!');

    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  // INFO Singleton pattern
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  addEmployee(name: string) {
    if (name === 'Max') return;

    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  describe(): void {
    console.log(`Accounting Department: (${this.id})-${this.name}`);
  }
}

// INFO Singleton pattern
const accounting = AccountingDepartment.getInstance();
// const accounting2 = new AccountingDepartment('dep3', []);

// accounting.employees[10] = 'Julia';

// console.log(accounting.getLastReport);

accounting.describe();
accounting.addEmployee('Anton');
accounting.addEmployee('Sasha');

accounting.addReport('Some test report');

accounting.addEmployee('Max');
accounting.addEmployee('Cocos');
accounting.printEmployeeInformation();

accounting.setLastReport = 'Last report';
accounting.printReports();

console.log(accounting.getLastReport);

const employee1 = Department.createEmployee('Kitty');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('dep2', ['Anton', 'Cocos']);
it.describe();

console.log(it);
