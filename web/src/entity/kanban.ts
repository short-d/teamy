import {Column} from './column';

export interface Kanban {
  id: string;
  columns: Column[];
  deliveredPoints: number;
}