package resolver

import (
	"github.com/short-d/teamy/backend/app/adapter/gqlapi/scalar"
	"github.com/short-d/teamy/backend/app/entity"
)

type Story struct {
	story entity.Story
}

func (s Story) ID() string {
	return s.story.ID
}

func (s Story) Title() string {
	return s.story.Title
}

func (s Story) NotesMarkdown() *string {
	return s.story.NotesMarkdown
}

func (s Story) Tags() []string {
	return s.story.Tags
}

func (s Story) AssignedTo() (*User, error) {
	if s.story.AssignedTo == nil {
		return nil, nil
	}
	return &User{user: *s.story.AssignedTo}, nil
}

func (s Story) IsCompleted() bool {
	return s.story.IsCompleted
}

func (s Story) Points() *float64 {
	return s.story.Points
}

func (s Story) DueAt() *scalar.Time {
	if s.story.DueAt == nil {
		return nil
	}
	return &scalar.Time{Time: *s.story.DueAt}
}

func newStory(story entity.Story) Story {
	return Story{story: story}
}
