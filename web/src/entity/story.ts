import {User} from './user';

export interface Story {
  id: string;
  title: string;
  notesMarkdown?: string;
  tags: string[];
  assignedTo?: User;
  isCompleted: boolean;
  points?: number;
  dueAt?: Date;
}