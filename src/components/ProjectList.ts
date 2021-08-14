import { Project, ProjectStatus } from "../models/Project";
import projectState from "../state/projectState";
import Component from "./Component";
import ProjectItem from "./ProjectItem";

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
    this.assignedProjects.forEach(project => {
      new ProjectItem(this.element.querySelector('ul')!.id, project)
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