import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { ProjectStatus } from './models/Project';

new ProjectForm();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Completed);

