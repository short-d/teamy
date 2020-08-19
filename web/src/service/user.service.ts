import {User} from '../entity/user';

import harry from './harry.jpeg';
import aaron from './aaron.jpeg';
import oscar from './oscar.png';
import arber from './arber.jpeg';
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
    return {avatarURL: harry, id: 'harry', name: 'Harry'};
  }

  members(projectId: string): User[] {
    return [
      {avatarURL: aaron, id: 'aaron', name: 'Aaron'},
      {avatarURL: oscar, id: 'oscar', name: 'Oscar'},
      {avatarURL: arber, id: 'arber', name: 'Arber'}
    ];
  }
}