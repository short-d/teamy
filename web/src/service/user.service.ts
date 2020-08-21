import {User} from '../entity/user';

import question from './question.svg';

export class UserService {
  unassigned(): User {
    return {
      id: 'unassigned',
      name: 'Unassigned',
      avatarURL: question
    };
  }

  me(): User {
    return {avatarURL: '/avatar/harry.jpeg', id: 'harry', name: 'Harry'};
  }

  members(projectId: string): User[] {
    return [
      {avatarURL: '/avatar/aaron.jpeg', id: 'aaron', name: 'Aaron'},
      {avatarURL: '/avatar/oscar.png', id: 'oscar', name: 'Oscar'},
      {avatarURL: '/avatar/arber.jpeg', id: 'arber', name: 'Arber'}
    ];
  }
}