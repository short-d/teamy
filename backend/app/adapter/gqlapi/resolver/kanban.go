package resolver

import (
	"github.com/short-d/teamy/backend/app/entity"
)

type Kanban struct {
	kanban  entity.Kanban
	columns []Column
}

func (k Kanban) ID() string {
	return k.kanban.ID
}

func (k Kanban) Columns() []Column {
	return k.columns
}

func newKanban(kanban entity.Kanban) Kanban {
	var columns []Column
	for _, column := range kanban.Columns {
		columns = append(columns, newColumn(column))
	}
	return Kanban{kanban: kanban, columns: columns}
}
