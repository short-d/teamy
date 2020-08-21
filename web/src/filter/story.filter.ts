import {Story} from '../entity/story';

export type StoryFilter = (story: Story) => boolean;

export const allStories: StoryFilter = (story: Story) => {
  return true;
};

export const unassignedStories: StoryFilter = (story: Story) => {
  return !story.assignedTo;
};

export function storiesAssignTo(userId: string): StoryFilter {
  return (story: Story): boolean =>
    (!!story.assignedTo && story.assignedTo.id === userId);
}