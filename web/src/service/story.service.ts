import {Story} from '../entity/story';
import {v4 as uuidv4} from 'uuid';
import {User} from '../entity/user';

export class StoryService {
  private autoAssignTo?: User;

  updateAutoAssignTo(user?: User) {
    this.autoAssignTo = user;
  }

  createEmptyStory(): Story {
    // TODO: get unique ID from server
    return {
      id: uuidv4(),
      title: '',
      tags: [],
      isCompleted: false,
      assignedTo: this.autoAssignTo,
    };
  }
}