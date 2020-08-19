import {User} from './user';

export interface Story {
  id: string;
  title: String;
  notesMarkdown?: String;
  tags: string[];
  assignedTo?: User;
  isCompleted: boolean;
  points?: number;
  dueAt?: Date;
}