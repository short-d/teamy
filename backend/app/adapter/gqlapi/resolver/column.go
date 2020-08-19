package resolver

import (
	"github.com/short-d/teamy/backend/app/entity"
)

type Column struct {
	column  entity.Column
	stories []Story
}

func (c Column) ID() string {
	return c.column.ID
}

func (c Column) Title() string {
	return c.column.Title
}

func (c Column) IconURL() string {
	return c.column.IconURL
}

func (c Column) Color() string {
	return c.column.Color
}

func (c Column) Stories() []Story {
	return c.stories
}

func newColumn(column entity.Column) Column {
	var stories []Story
	for _, story := range column.Stories {
		stories = append(stories, newStory(story))
	}
	return Column{
		column:  column,
		stories: stories,
	}
}
