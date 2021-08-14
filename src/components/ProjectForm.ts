import Binder from "../decorators/Binder";
import projectState from "../state/projectState";
import { ValidationInput, validate } from "../utils/validation";
import Component from "./Component";
export default class ProjectForm extends Component<HTMLDivElement, HTMLFormElement>{
  titleInput: HTMLInputElement
  descriptionInput: HTMLInputElement
  peopleInput: HTMLInputElement

  constructor() {
    super('project-input', 'app', true,)


    this.titleInput = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInput = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInput = this.element.querySelector('#people') as HTMLInputElement;
    this.configure();
  }

  private getUserInput(): [string, string, number] | null {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const people = +this.peopleInput.value;
    const validators: ValidationInput[] = [
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
      projectState.addProject(...input);
      this.clearInputs();
    }

  }

  renderContent() { }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }


}