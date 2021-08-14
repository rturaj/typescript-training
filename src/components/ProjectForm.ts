import Binder from "../decorators/Binder";
import { Validatable, validate } from "../utils/validation";
export default class ProjectForm {
  template: HTMLTemplateElement;
  appRoot: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInput: HTMLInputElement
  descriptionInput: HTMLInputElement
  peopleInput: HTMLInputElement

  constructor() {
    this.template = document.getElementById('project-input')! as HTMLTemplateElement;
    this.appRoot = document.getElementById('app')! as HTMLDivElement;

    const content = document.importNode(this.template.content, true);
    this.formElement = content.firstElementChild as HTMLFormElement;

    this.titleInput = this.formElement.querySelector('#title') as HTMLInputElement;
    this.descriptionInput = this.formElement.querySelector('#description') as HTMLInputElement;
    this.peopleInput = this.formElement.querySelector('#people') as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private getUserInput(): [string, string, number] | null {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const people = +this.peopleInput.value;
    const validators: Validatable[] = [
      { name: 'title', value: title, required: true, minLength: 5, maxLength: 20 },
      { name: 'description', value: description, required: true, minLength: 10 },
      { name: 'people', value: people, required: true, min: 1, max: 10 }
    ]
    const errors: string[] = [];
    validators.forEach(v => {
      const validationResult = validate(v);
      if (!validationResult.isValid) {
        errors.push(...validationResult.errorMessages)
      }
    })
    if (errors.length) {
      alert(errors.flat().join('\n'));
      return null;
    }
    return [title, description, people];
    ;
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }

  @Binder
  private submitHandler(e: Event) {
    e.preventDefault();
    const input = this.getUserInput();
    if (input) {
      console.log(input)
      this.clearInputs();
    }

  }

  private configure() {
    this.formElement.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.appRoot.insertAdjacentElement('afterbegin', this.formElement);
  }
}