import {Story} from './story';

export interface Column {
  title: string;
  iconURL: string;
  color: string;
  stories: Story[];
}
