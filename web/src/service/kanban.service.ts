import {Kanban} from '../entity/kanban';
import harry from './harry.jpeg';

export class KanbanService {
  fetchKanban(): Kanban {
    return {
      id: 'd0c2031b-2675-4af7-955e-0809cc61ee53',
      columns: [
        {
          title: 'Open',
          color: 'red',
          iconURL: '',
          stories: [
            {
              id: '7df00de5-08c5-4e58-b0b1-e731af3c020e',
              title: 'Replace Nginx with custom frontend server to serve web UI',
              tags: [],
              isCompleted: false,
            },
            {
              id: '8e8f937b-27dc-40d5-b27d-a785339f6094',
              title: 'Move GraphQL logic from ShortLink service to ShortLinkGraphQLApi',
              tags: [],
              isCompleted: false,
            },
            {
              id: 'c60d791e-9b53-489b-929c-24adba155503',
              title: 'Build API rate limiting library',
              tags: [],
              isCompleted: false,
              assignedTo: {avatarURL: harry, id: 'harry', name: 'Harry'},
            }
          ]
        },
        {
          title: 'In Progress',
          color: 'yellow',
          iconURL: '',
          stories: []
        },
        {
          title: 'Blocked',
          color: 'gray',
          iconURL: '',
          stories: []
        },
        {
          title: 'In Review',
          color: 'blue',
          iconURL: '',
          stories: []
        },
        {
          title: 'Done',
          color: 'green',
          iconURL: '',
          stories: []
        },
      ]
    };
  }
}