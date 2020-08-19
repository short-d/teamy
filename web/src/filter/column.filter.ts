import {Column} from '../entity/column';

export type ColumnsFilter = (columns: Column[]) => Column[];

export function allStories(columns: Column[]): Column[] {
  return columns;
}

export function unassignedStories(columns: Column[]): Column[] {
  return columns.map(column =>
    Object.assign<any, Column, Partial<Column>>({}, column, {
      stories: column.stories.filter(story => !story.assignedTo)
    }));
}

export function storiesAssignTo(userId: string): ColumnsFilter {
  return (columns: Column[]): Column[] => {
    return columns.map(column => Object.assign<any, Column, Partial<Column>>({}, column, {
      stories: column.stories.filter(story => story.assignedTo &&
        story.assignedTo.id === userId)
    }));
  };
}