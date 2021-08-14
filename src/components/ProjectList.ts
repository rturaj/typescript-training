import { Project, ProjectStatus } from "../models/Project";
import projectState from "../state/projectState";
import Component from "./Component";

export default class ProjectList extends Component<HTMLDivElement, HTMLElement>{

  assignedProjects: Project[] = [];

  constructor(private type: ProjectStatus) {
    super('project-list', 'app', false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listEl.innerHTML = '';
    this.assignedProjects.forEach(p => {
      const listItem = document.createElement('li');
      listItem.textContent = p.title;
      listEl.appendChild(listItem);
    })
  }

  renderContent() {
    this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
    this.element.querySelector('h2')!.textContent = `${this.type} PROJECTS`;
  }

  configure() {
    projectState.addListener(projects => {
      this.assignedProjects = projects.filter(p => p.status === this.type);
      this.renderProjects();
    })
  }


}