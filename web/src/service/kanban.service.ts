import {Kanban} from '../entity/kanban';
import {TeamyGraphQLService} from './teamy.graphql.service';

export class KanbanService {
  constructor(private teamyGraphQLService: TeamyGraphQLService) {}

  fetchActiveKanban(): Promise<Kanban> {
    return this.teamyGraphQLService.getActiveKanban();
  }
}