import { Project } from '../models/Project';
import Component from './Component';
export default class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>{
  private project: Project;

  get peopleLabel() {
    return this.project.people + this.project.people === 1 ? ' person' : ' persons' + ' assigned'
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  configure() {

  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.project.people.toString() + this.peopleLabel;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}