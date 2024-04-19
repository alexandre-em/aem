import { EntityService } from './entity';

export class ProjectService extends EntityService<ProjectType> {
  constructor() {
    super('projects');
  }
}
