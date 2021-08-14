export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  template: HTMLTemplateElement;
  root: T;
  element: U;

  constructor(
    templateId: string,
    rootId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.template = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.root = document.getElementById(rootId)! as T;

    const importedNode = document.importNode(
      this.template.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.root.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
