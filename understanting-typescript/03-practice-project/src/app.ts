// INFO Project State Management - singleton

class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = {
      id: Math.random().toPrecision(5),
      title,
      description,
      people: numberOfPeople,
    };

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }
}

const projectState = ProjectState.getInstance();
console.log(projectState);

// INFO Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = function (validatableInput: Validatable) {
  let isValid = true;

  const { value, required, minLength, maxLength, min, max } = validatableInput;

  const valueLength = value.toString().trim().length;

  if (required) {
    isValid = isValid && value.toString().trim().length !== 0;
  }

  if (minLength && typeof value === 'string') {
    isValid = isValid && valueLength >= minLength;
  }

  if (maxLength && typeof value === 'string') {
    isValid = isValid && valueLength <= maxLength;
  }

  // min != null - check for null and undefined; min might be 0!
  if (min != null && typeof value === 'number') {
    isValid = isValid && value >= min;
  }

  if (max && typeof value === 'number') {
    isValid = isValid && value <= max;
  }

  return isValid;
};

// INFO Auto-bind decorator
const Autobind = function (_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
};

// ProjectList class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(
    templateID: string = 'project-list',
    hostID: string = 'app',
    private type: 'active' | 'finished'
  ) {
    this.templateElement = document.getElementById(
      templateID
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostID)! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector(
      'h2'
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;

      listEl.appendChild(listItem);
    }
  }
}

// ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor(
    templateID: string = 'project-input',
    hostID: string = 'app',
    elementID: string = 'user-input'
  ) {
    this.templateElement = document.getElementById(
      templateID
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostID)! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = elementID;

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;

      projectState.addProject(title, description, people);

      this.clearUserInputs();
    }
  }

  private gatherUserInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5,
      maxLength: 25,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 10,
      maxLength: 250,
    };

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 15,
    };

    if (
      validate(titleValidatable) &&
      validate(descriptionValidatable) &&
      validate(peopleValidatable)
    ) {
      return [enteredTitle, enteredDescription, +enteredPeople];
    } else {
      alert('⚠Invalid input, please try again!⚠');
      return;
    }
  }

  private clearUserInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
}

// Initiate classes instance

const projectForm = new ProjectInput();

const activeProjectList = new ProjectList(undefined, undefined, 'active');

const finishedProjectList = new ProjectList(undefined, undefined, 'finished');
