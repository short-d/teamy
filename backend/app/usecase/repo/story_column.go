package repo

type StoryColumn interface {
	GetStoryIDsByColumn(columnID string) ([]string, error)
}
