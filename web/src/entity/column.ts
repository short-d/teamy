import {Story} from './story';

export interface Column {
  id: string;
  title: string;
  iconURL: string;
  color: string;
  stories: Story[];
}
