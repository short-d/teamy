package repo

import "github.com/short-d/teamy/backend/app/entity"

type Column interface {
	GetColumnByID(id string) (entity.Column, error)
}
