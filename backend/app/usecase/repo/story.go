package repo

import "github.com/short-d/teamy/backend/app/entity"

type Story interface {
	GetStoryByID(id string) (entity.Story, error)
}
