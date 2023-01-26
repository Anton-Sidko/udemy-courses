class Department {
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  describe() {
    console.log(`Department: (${this.id})-${this.name}`);
  }

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
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get getLastReport() {
    if (this.lastReport) return this.lastReport;

    throw new Error('No report found.');
  }

  set setLastReport(value: string) {
    if (!value) throw new Error('No report value!');

    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
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
}

const accounting = new AccountingDepartment('dep1', []);

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

const it = new ITDepartment('dep2', ['Anton', 'Cocos']);

console.log(it);
