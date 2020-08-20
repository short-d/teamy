package project

import (
	"github.com/short-d/teamy/backend/app/entity"
	"github.com/short-d/teamy/backend/app/usecase/repo"
)

type Project struct {
	projectRepo repo.Project
	columnKanbanRepo repo.ColumnKanban
	columnRepo repo.Column
	storyColumnRepo repo.StoryColumn
	storyAssignedToRepo repo.StoryAssignedTo
}

func (p Project) FetchActiveKanban(projectID string) (entity.Kanban, error) {
	kanbanID, err := p.projectRepo.GetActiveKanbanID(projectID)
	columnIDs, err := p.columnKanbanRepo.GetColumnIDsForKanban(kanbanID)

	var columns []entity.Column
	for _, columnID := range columnIDs {
		column, err := p.getColumn(columnID)
		columns = append(columns, column)
	}
	return entity.Kanban{
		ID:      kanbanID,
		Columns: columns,
	}, nil
}

func (p Project) getColumn(columnID string) (entity.Column, error) {
	column, err := p.columnRepo.GetColumnByID(columnID)
	column.Stories, err = p.getStories(columnID)
	return column, err
}

func (p Project) getStories(columnID string) ([]entity.Story, error) {
	storyIDs, err := p.storyColumnRepo.GetStoryIDsByColumn(columnID)
	var stories []entity.Story
	for _, storyID := range storyIDs {
		stories = append(stories, p.getStory())
	}
}