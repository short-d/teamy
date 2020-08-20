package repo

type Project interface {
	GetActiveKanbanID(projectID string) (string, error)
}