import {GraphQLService, IGraphQLQuery} from '../fw/GraphQL.service';
import {Kanban} from '../entity/kanban';
import {EnvService} from './env.service';

interface IGraphQLQueryResult {
  authQuery: IGraphQLAuthQueryResult
}

interface IGraphQLAuthQueryResult {
  activeKanban: Kanban
}

export class TeamyGraphQLService {
  private readonly baseURL: string;

  constructor(private graphQLService: GraphQLService, private envService: EnvService) {
    this.baseURL = `${envService.getEnv().graphQLBaseURL}/graphql`;
  }

  getActiveKanban(): Promise<Kanban> {
    const query: IGraphQLQuery = {
      query: `
query ($authToken: String){
  authQuery(authToken: $authToken) {
    activeKanban {
      id
      columns {
        id
        title
        color
        stories {
          id
          title
          tags
          assignedTo {
            id
            name
            avatarURL
          }
        }
      }
    }
  }
}
      `,
      variables: {
        authToken: ''
      }
    };
    return this
      .graphQLService
      .query<IGraphQLQueryResult>(this.baseURL, query)
      .then(result => result.authQuery.activeKanban);
  }
}