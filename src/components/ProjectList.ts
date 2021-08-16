import Binder from "../decorators/Binder";
import DragTarget from "../models/DragTarget";
import { Project, ProjectStatus } from "../models/Project";
import projectState from "../state/projectState";
import Component from "./Component";
import ProjectItem from "./ProjectItem";

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

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

  @Binder
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @Binder
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      projectId,
      this.type
    );
  }

  @Binder
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projectState.addListener(projects => {
      this.assignedProjects = projects.filter(p => p.status === this.type);
      this.renderProjects();
    })
  }


}