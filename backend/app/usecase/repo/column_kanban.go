package repo

type ColumnKanban interface {
	GetColumnIDsForKanban(kanbanID string) ([]string, error)
}