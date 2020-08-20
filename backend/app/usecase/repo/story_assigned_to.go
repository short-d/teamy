package repo

type StoryAssignedTo interface {
	GetAssignedUserForStory(storyID string) (string, error)
}
