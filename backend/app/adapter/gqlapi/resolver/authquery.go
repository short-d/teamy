package resolver

import (
	"github.com/short-d/app/fw/ptr"
	"github.com/short-d/teamy/backend/app/entity"
)

// AuthQuery represents GraphQL query resolver that acts differently based
// on the identify of the user
type AuthQuery struct {
	authToken *string
}

func (a AuthQuery) ActiveKanban() Kanban {
	columns := []entity.Column{
		{
			ID:      "4865ac93-a07f-4766-ab3c-234f6a0e2adf",
			Title:   "Open",
			IconURL: "",
			Color:   "red",
			Stories: []entity.Story{
				{
					ID:            "d8423225-d8cb-435b-aee5-6bea91afac78",
					Title:         "Replace Nginx with custom frontend server to serve web UI",
					NotesMarkdown: nil,
					Tags:          nil,
					AssignedTo: &entity.User{
						ID:        "harry",
						Name:      ptr.String("Harry"),
						AvatarURL: ptr.String("/avatar/harry.jpeg"),
					},
					IsCompleted: false,
					Points:      nil,
					DueAt:       nil,
				},
				{
					ID:            "b6098443-f6db-44b9-98f5-ec73f9862d9c",
					Title:         "Build API rate limiting library",
					NotesMarkdown: nil,
					Tags:          nil,
					AssignedTo: &entity.User{
						ID:        "oscar",
						Name:      ptr.String("Oscar"),
						AvatarURL: ptr.String("/avatar/oscar.png"),
					},
					IsCompleted: false,
					Points:      nil,
					DueAt:       nil,
				},
				{
					ID:            "305212f9-1530-48bd-9013-96b29875594d",
					Title:         "Create a output encoder for server side rendering",
					NotesMarkdown: nil,
					Tags:          nil,
					AssignedTo:    nil,
					IsCompleted:   false,
					Points:        nil,
					DueAt:         nil,
				},
				{
					ID:            "987f670f-1c9b-4aaf-86b6-1430228d6a4f",
					Title:         "Add HTTP tracking code for Github single sign on",
					NotesMarkdown: nil,
					Tags:          nil,
					AssignedTo:    nil,
					IsCompleted:   false,
					Points:        nil,
					DueAt:         nil,
				},
			},
		},
		{
			ID:      "29fe77d2-d81f-47f2-a276-ed37b03bdab6",
			Title:   "In Progresses",
			IconURL: "",
			Color:   "yellow",
			Stories: []entity.Story{},
		},
		{
			ID:      "d6907658-0349-4687-afc1-be02f7a43cd7",
			Title:   "Blocked",
			IconURL: "",
			Color:   "gray",
			Stories: []entity.Story{},
		},
		{
			ID:      "a1eb2ebc-82a9-4059-b8a3-b05566bd0553",
			Title:   "In Review",
			IconURL: "",
			Color:   "blue",
			Stories: []entity.Story{},
		},
		{
			ID:      "92889b78-bb9e-451d-b118-bd87fd35ea36",
			Title:   "Done",
			IconURL: "",
			Color:   "green",
			Stories: []entity.Story{},
		},
	}
	kanban := entity.Kanban{
		ID:      "19a18ad6-4d29-4e2d-9068-17792fc5b2fd",
		Columns: columns,
	}
	return newKanban(kanban)
}

func newAuthQuery(
	authToken *string,
) AuthQuery {
	return AuthQuery{
		authToken: authToken,
	}
}
