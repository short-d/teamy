import {Kanban} from '../entity/kanban';
import {TeamyGraphQLService} from './teamy.graphql.service';

export class ProjectService {
  constructor(private teamyGraphQLService: TeamyGraphQLService) {
  }

  fetchActiveSprint(): Promise<Kanban> {
    return this.teamyGraphQLService.getActiveKanban();
  }

  fetchAllSprints(): Promise<Kanban[]> {
    const sprints: Kanban[] = [
      {
        id: '',
        columns: [],
        deliveredPoints: 15,
      },
      {
        id: '',
        columns: [],
        deliveredPoints: 50,
      },
      {
        id: '',
        columns: [],
        deliveredPoints: 30,
      }
    ];
    return Promise.resolve<Kanban[]>(sprints);
  }
}