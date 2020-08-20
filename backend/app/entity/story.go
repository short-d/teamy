package entity

import (
	"time"
)

type Story struct {
	ID            string
	Title         string
	NotesMarkdown *string
	Tags          []string
	AssignedTo    *User
	IsCompleted   bool
	Points        *float64
	DueAt         *time.Time
}
